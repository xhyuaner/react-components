import { DatePicker, NavBar } from 'antd-mobile'
import { useEffect, useMemo } from 'react'
import groupBy from 'lodash/groupBy'
import { orderBy } from 'lodash'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'

import { getOverview } from '@/content/billList'
import { useLocation } from 'react-router-dom'
import { useMonthBillList } from '@/hooks/useBillList'
import { useDate } from '@/hooks/useDate'
import TwoLineOverview from '@/components/TwoLineOverview'
import DailyBill from './components/DailyBill'


const MonthlyBill = () => {
    const { state } = useLocation()
    // 时间选择器的相关函数
    const { date, visible, onShowDate, onHideDate, onDateChange } = useDate()
    const selectedYear = date.get('year')
    const selectedMonth = date.get('month')

    const currentBillList = useMonthBillList(selectedYear, selectedMonth)

    const overview = getOverview(currentBillList)

    const monthBills = useMemo(() => {
        const billGroup = groupBy(currentBillList, item =>
            dayjs(item.date).format('YYYY-MM-DD')
        )
        const sortedKeys = orderBy(
            Object.keys(billGroup),
            // 转成日期数字，在进行比较
            item => +new Date(item),
            'desc'
        )
        return {
            keys: sortedKeys,
            billGroup,
        }
    }, [currentBillList])

    useEffect(() => {
        if (state === null) return
        onDateChange(state.date)
    }, [state, onDateChange])

    const renderMonthBills = () => {
        const { keys, billGroup } = monthBills
        return keys.map(key => {
            const dateText = dayjs(key).format('MM月DD日')
            const overview = getOverview(billGroup[key])

            return (
                // 单日列表统计
                <DailyBill
                    key={key}
                    overview={overview}
                    dateText={dateText}
                    billList={billGroup[key]}
                />
            )
        })
    }

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>

            <div className="content">
                <div className="header">
                    <div className="date">
                        <span className="text" onClick={onShowDate}>
                          {selectedYear} | {selectedMonth + 1}月账单
                        </span>
                        {/*根据时间选择器弹框打开状态控制expand类名是否存在*/}
                        <span className={classNames('arrow', visible && 'expand')}></span>
                    </div>
                    {/*时间选择器*/}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={visible}
                        onClose={onHideDate}
                        max={new Date()}
                        onConfirm={onDateChange}
                    />

                    <TwoLineOverview
                        pay={overview.pay}
                        income={overview.income}
                        type="month"
                    />
                </div>

                {renderMonthBills()}
            </div>
        </div>
    )
}

export default MonthlyBill
