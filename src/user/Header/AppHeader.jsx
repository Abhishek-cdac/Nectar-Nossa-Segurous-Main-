import React from 'react';
import { Input,Layout } from 'antd';

const { Header } = Layout;
const {Search} = Input;

const onSearch = value => console.log(value);


export default function AppHeader() {
    return (
        <Layout>
            <Header style={{ backgroundColor: '#61b33b' }}> 
            <div>           
        <img className="logo" src='D:\ReactNasso\nasso\src\svgs\User Dashboard\logo.png'></img> 
         
            </div>
           

            </Header>
        </Layout>
    );
}
