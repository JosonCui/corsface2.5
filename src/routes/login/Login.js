/**
 * Created by Jason on 2018/2/1.
 */
import React, {PropTypes} from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';

import styles from './login.less';

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.loginContainer}>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <label className={styles.formLabel}>用户名</label>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入正确的用户名！' }]
            })(
              <Input />
                            )}
          </FormItem>
          <label className={styles.formLabel}>密码</label>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入正确的密码！' }]
            })(
              <Input type="password" />
                            )}
          </FormItem>
          <FormItem style={{width: '400px'}}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>我已阅读并同意</Checkbox>
                            )}
            <a className="login-form-forgot" href="">《考斯重点场所管理平台使用协议》</a>
            <div className={styles.submitContain}>
              <Button type="primary" htmlType="submit" className={styles.submitBtn}>登 录</Button>
            </div>


          </FormItem>
        </Form>
      </div>
    );
  }
}


export default Form.create()(Login);
