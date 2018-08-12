import React from 'react'

const Order = ({
                    symbol,
                    qty,
                    side,
                    ordertype,
                    exchange,
                    limitprice,
                    triggerprice,
                    orderstatus
                }) => 
                    (
                        <tr>
                            <td>{}</td>
                            <td>{ordertype}</td>
                            <td>{symbol}</td>
                            <td></td>
                            <td>{qty}</td>
                            <td></td>
                            <td>{limitprice}</td>
                            <td>{orderstatus}</td>
                        </tr>
                    )

export default Order;