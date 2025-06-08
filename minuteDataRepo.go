package repository

import (
	"database/sql"
	"fmt"
	"papertrader.io/scratch/dto"
	"time"
)

type minuteDateRepo struct {
	db *sql.DB
}

func NewMinuteDateRepo(db *sql.DB) *minuteDateRepo {
	return &minuteDateRepo{db: db}
}

func (r *minuteDateRepo) IsDataPresent(scripId string, startTime time.Time, endTime time.Time) bool{
	query := "SELECT COUNT(*) as cnt FROM minute_data WHERE scrip_id = ? AND `timestamp` BETWEEN ? AND ?"
	if(r.db == nil){
		return true
	}
	sel, err := r.db.Prepare(query)
	if(err != nil){
		fmt.Println("Could not prepare query : ", query)
	}
	result, err := sel.Query(scripId, startTime, endTime)
	if(err != nil){
		fmt.Println("Error while select query :", query)
	}
	var cnt int64
	for result.Next() {
		result.Scan(&cnt)
	}
	if(cnt > 0){
		return true
	}
	return false
}

func (r *minuteDateRepo) Insert(symbol string, scripId string, candles []dto.Candle) error {
	mainQuery := "INSERT INTO minute_data (`symbol`, `scrip_id`, `open`, `high`, `low`, `close`, `volume`, `unknown`, `timestamp`) VALUES "
	query := mainQuery
	vals := []interface{}{}
	for idx, candle := range candles {
		query += "(?,?,?,?,?,?,?,?,?),"
		vals = append(vals, symbol, scripId, candle.Open, candle.High, candle.Low, candle.Close, candle.Volume, candle.Unknown, candle.TimeStamp)

		if((idx + 1) % 100 == 0){
			query = query[0:len(query)-1]

			var ins *sql.Stmt
			var err error
			if(r.db !=nil){
				ins, err = r.db.Prepare(query)
				if err != nil {
					fmt.Println("Could not prepare query :", query)
				} else{
					result, err := ins.Exec(vals...)
					if err != nil {
						fmt.Println(err.Error())
						fmt.Println("Could not insert. Query: ", query)
					} else{
						count, err := result.RowsAffected()
						if err != nil {
							fmt.Println("Could not insert all. Inserted", count)
						}
						//fmt.Println(fmt.Sprintf("Inserted %d Records", count));
					}
				}
			}
			query = mainQuery
			vals = []interface{}{}
		}
	}
	if(len(vals) == 0){
		return nil
	}
	query = query[0:len(query)-1]
	ins, err := r.db.Prepare(query)

	if err != nil {
		fmt.Println("Could not prepare query :", query)
		return nil
	}
	result, err := ins.Exec(vals...)
	if err != nil {
		fmt.Println("Could not insert ")
		return nil
	}
	count, err := result.RowsAffected()
	if err != nil {
		fmt.Println("Could not insert all. Inserted:", count)
	}
	return nil
}
