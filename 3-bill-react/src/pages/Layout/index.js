import { TabBar } from 'antd-mobile'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from 'antd-mobile-icons'
import './index.scss'

const tabs = [
  {
    path: '/month',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    path: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    path: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="kaLayout">
      <div className="page">
        {/* 二级路由出口 */}
        <Outlet />
      </div>

      <TabBar
        className="tabbar"
        activeKey={location.pathname}
        onChange={key => navigate(key)}
      >
        {tabs.map(item => (
          <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
