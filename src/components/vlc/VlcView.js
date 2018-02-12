/**
 * Created by Jason on 2018/2/9.
 */

import React from 'react';
import $ from 'jquery';
import styles from './vlcView.less';

const initCamera = (_MRL, width, id) => {
  console.log('initCamera');
  const vlc = document.getElementById(id);
  if (!vlc) {
    return;
  }
  setTimeout(() => {
    try {
      bbb.playlist.stop();
    } catch (exception) {
            // 暂不处理
    }
    try {
      vlc.playlist.clear();
      vlc.playlist.add(_MRL);
      vlc.playlist.play();
      $(vlc).width(width - 1);
      $(vlc).height((width) * 9 / 16);
    } catch (exception) {
            // 暂不处理
            // initCamera();
    }
  }, 1000);
};

class VlcView extends React.Component {
  componentDidMount() {
    const vlcContainer = document.getElementById('vlc_content');
    const computedStyle = window.getComputedStyle(vlcContainer, '');
    let width = computedStyle.width;
    width = parseInt(width.replace('px', '') - 0, 10);
        // const _MRL = 'rtsp://admin:cf123456@192.168.1.78';
    const _MRL = this.props.vlcSrc;
    console.log('componentDidMount');
    initCamera(_MRL, width, `vlc_${this.props.id}`);
  }
  componentDidUpdate() {
    const vlcContainer = document.getElementById('vlc_content');
    const computedStyle = window.getComputedStyle(vlcContainer, '');
    let width = computedStyle.width;
    width = parseInt(width.replace('px', '') - 0, 10);
      // const _MRL = 'rtsp://admin:cf123456@192.168.1.78';
    const _MRL = this.props.vlcSrc;
    console.log('componentDidUpdata');
    initCamera(_MRL, width, `vlc_${this.props.id}`);
  }
  render() {
    return (
      <div id="vlc_content" className={styles.vlcContent} >
        <div className={styles.videoStyle}>
          <object
            id={`vlc_${this.props.id}`} type="application/x-vlc-plugin"
                        >
            <div style={{width: '100%', height: '100%', background: 'red'}} />
            <param name="mrl"/>
            <param name="volume" value="50" />
            <param name="wmode" value="Opaque" />
            <param name="autoplay" value="true" />
            <param name="play" value="true" />
            <param name="quality" value="high" />
            <param name="loop" value="false" />
            <param name="fullscreen" value="true" />
            <param name="Menu" value="false"/>
            <param name="toolbar" value="false" />
          </object>
        </div>
      </div>
    );
  }
}

export default VlcView;
