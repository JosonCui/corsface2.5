/**
 * Created by Jason on 2018/1/26.
 */
import React from 'react';
import { connect } from 'dva';
import { Modal, Input, TreeSelect, Select, InputNumber, Radio, Upload, Button, Icon } from 'antd';
import styles from './Target.less';
import rehana from '../../../assets/rehana.jpg';

import { API_PREFIX } from '../../../utils/config';

const RadioGroup = Radio.Group;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class NewPersonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      loading: false,
      imageUrl: ''
    };
  }
  onUploadChange = info => {
    console.log(info.file);
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
          // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        const { poiPerson } = this.props.bussiness;

        this.setState({
          loading: false
        });
        this.props.dispatch({
          type: 'bussiness/success',
          payload: {
            poiPerson: {
              ...poiPerson,
              imageUrl
            }
          }
        });
      });
      console.log(info.file.response.result.dst);
      this.setState({
        fileList: info.file.response.result.dst
      });
      const poiPerson = this.props.bussiness.poiPerson;
      const { addPoiParams } = poiPerson;
      this.props.dispatch({
        type: 'bussiness/success',
        payload: {
          poiPerson: {
            ...poiPerson,
            addPoiParams: {
              ...addPoiParams,
              originImg_path_1: info.file.response.result.src.url
            }
          }
        }
      });
    }
  };
  onSelectImg = path => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            img_path_1: path
          }
        }
      }
    });
  };
  onNameChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            name: e.target.value
          }
        }
      }
    });
  };
  onGenderChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            gender: e.target.value - 0
          }
        }
      }
    });
  };
  onGroupChange = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            groupId: value
          }
        }
      }
    });
  };
  onThresholdChange = value => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            threshold: value
          }
        }
      }
    });
  };
  onIdentityCardChange = e => {
    const poiPerson = this.props.bussiness.poiPerson;
    const { addPoiParams } = poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            ...addPoiParams,
            identityCard: e.target.value
          }
        }
      }
    });
  };

  onSubmit = () => {
    switch (this.props.action) {
      case 'new':
        this.props.dispatch({
          type: 'bussiness/addPoiByUpload'
        });
        this.setState({
          fileList: []
        });
        break;
      case 'edit':
        this.props.dispatch({
          type: 'bussiness/modifyPoi'
        });
          this.setState({
              fileList: []
          });
        break;
    }
  };
  onCancel = () => {
    const poiPerson = this.props.bussiness.poiPerson;
    this.props.dispatch({
      type: 'bussiness/success',
      payload: {
        poiPerson: {
          ...poiPerson,
          addPoiParams: {
            personId: '',
            faceCount: 1,
            originCount: 1,
            img_path_1: '',
            originImg_path_1: '',
            name: '',
            gender: '',
            threshold: '',
            groupId: '',
            orgunitId: '',
            identityCard: '',
            impTag: '',
            memo: ''
          },
          addPoiModalVisiable: false,
          imageUrl: ''
        }
      }
    });
    this.setState({
      imageUrl: '',
      fileList: []
    });
  };

  cssIsSelected = path => {
    if (path === this.props.bussiness.poiPerson.addPoiParams.img_path_1) {
      return `${styles.imgToBeSelected} ${styles.imgSelected}`;
    }
    return styles.imgToBeSelected;
  };
  renderUploadIcon = () => (<div className={styles.upload}>
    <Icon type={this.state.loading ? 'loading' : 'plus'} />
  </div>);
  renderImgContainer = () => (<div>
    <span className={styles.remindText}>请选择需要检索的人脸（单选）</span>
    <div className={styles.imgContainer}>
      <div style={{width: `${this.state.fileList.length * 85}px`}}>
        {this.renderSelectImg(this.state.fileList) }
      </div>
    </div>
  </div>);
  renderSelectImg = fileList => {
    console.log(fileList);
    let img = '';
    img = fileList.map(value => (<div
      className={this.cssIsSelected(value.path)}
      key={value.path}
      onClick={this.onSelectImg.bind(this, value.path)}>
      <img src={value.url} alt=""/>
    </div>

        ));
    return img;
  };
  renderGroups = () => (this.props.bussiness.poiGroup.allGroups.map(value => (<option value={value.id}>{value.name}</option>)))


  render() {
    const {poiPerson} = this.props.bussiness;
    return (<Modal
      title=""
      footer=""
      visible={this.props.bussiness.poiPerson.addPoiModalVisiable}
      closable={false}
      width={400}
      bodyStyle={{ border: '1px solid #02abe3' }}
      className={styles.modalBody}>
      <div className={styles.modalHeader}>
        <span className={styles.modalHeaderTitle}>新建目标</span>
      </div>
      <div className={styles.modalContent} >
        <div className={styles.modalInput}>
          <label className={styles.modalLabel} style={{verticalAlign: 'top'}}>照片：</label>
          <div style={{display: 'inline-block', maxWidth: '60%', overflow: 'hidden'}}>
            <Upload
              action={`${API_PREFIX}/poi/uploadFace.do`}
              name="image_1"
              listType="picture-card"
              showUploadList={false}
              onChange={this.onUploadChange}
            >
              { poiPerson.imageUrl ? <img className={styles.modalImg} src={poiPerson.imageUrl} alt=""/> : this.renderUploadIcon()}
            </Upload>

            { this.state.fileList.length > 0 ? this.renderImgContainer() : null}

          </div>
        </div>

        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>姓名：</label>
          <Input type="text" style={{width: '60%'}} value={poiPerson.addPoiParams.name} onChange={this.onNameChange}/>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>身份证：</label>
          <Input type="text" style={{width: '60%'}} value={poiPerson.addPoiParams.identityCard} onChange={this.onIdentityCardChange}/>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>性别：</label>
          <RadioGroup value={`${poiPerson.addPoiParams.gender}`} onChange={this.onGenderChange}>
            <Radio value="1" style={{color: '#fff', marginRight: '40px'}}>男</Radio>
            <Radio value="0" style={{color: '#fff', marginRight: '40px'}}>女</Radio>
          </RadioGroup>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>所属分组：</label>
          <Select style={{width: '60%'}} value={poiPerson.addPoiParams.groupId} onChange={this.onGroupChange}>
            { this.props.bussiness.poiGroup.allGroups.length > 0 ? this.renderGroups() : null}
          </Select>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>所属组织：</label>
          <TreeSelect
            showSearch
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            style={{width: '60%'}}>
            <TreeNode value="parent 1" title="parent 1" key="0-1">
              <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                <TreeNode value="leaf1" title="my leaf" key="random" />
                <TreeNode value="leaf2" title="your leaf" key="random1" />
              </TreeNode>
              <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
              </TreeNode>
            </TreeNode>
          </TreeSelect>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel}>阈值：</label>
          <InputNumber
            style={{width: '60%'}}
            max={100}
            min={0}
            value={poiPerson.addPoiParams.threshold}
            onChange={this.onThresholdChange}/>
        </div>
        <div className={styles.modalInput}>
          <label className={styles.modalLabel} />
          <Button type="primary" style={{ marginRight: '40px'}} onClick={this.onSubmit}>新增</Button>
          <Button type="primary" ghost onClick={this.onCancel}>关闭</Button>
        </div>
      </div>
    </Modal>);
  }
}

function mapStateToProps({ bussiness }) {
  return { bussiness };
}
export default connect(mapStateToProps)(NewPersonModal);
