import React from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom'
import firebase from '../../utils/firebase'
import { useHistory } from 'react-router-dom'
const { Header, Content, Footer } = Layout;



const LayoutComp = ({ children }) => {
  let history = useHistory();
  //const { state } = useContext(AppContext)
  // console.log(state.isUserLoggedin && state.isUserLoggedin.isUserLoggedin)
  // const isLoggedIn = firebase.isLoggedIn()


  const handleLogout = () => {
    firebase.logout()
    history.push('/login')
  }
  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">Home</Link> </Menu.Item>

            <Menu.Item key="2"> <Link to="/register">Register</Link> </Menu.Item>
            <Menu.Item key="3"><Link to="/login">Login</Link></Menu.Item>

            <Menu.Item key="4"><Link to="/profile">Profile</Link></Menu.Item>
            <Menu.Item>
              <Button type='primary' key="5" onClick={handleLogout}>Logout</Button>
            </Menu.Item>


          </Menu>
        </Header>
        <Content style={{ padding: '0 20px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: "59vw" }}>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Code Challenge</Footer>
      </Layout>
    </div>
  )
}

export default LayoutComp