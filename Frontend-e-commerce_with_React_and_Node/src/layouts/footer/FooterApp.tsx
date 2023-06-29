import React from 'react';
import { Layout, Space } from 'antd';

function FooterApp() {
    
    return (
        <Space direction="vertical" style={{ width: '100%', color:"black",  backgroundColor: '#7dbcea'}} size={[0, 48]}>
            <Layout>
            <article style={{textAlign: 'center', padding:"0px 10px", textDecoration: "none"}}>
                <ul>
                    <li>info | support | marketing</li>
                    <li>terms of use | privacy policy</li>
                </ul>
                <footer>
                    <p>© 2022 </p>
                </footer>
            </article>
            </Layout>
        </Space>
    );
  }
  
  export default FooterApp;