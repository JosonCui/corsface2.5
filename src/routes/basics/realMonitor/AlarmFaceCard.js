/**
 * Created by Jason on 2018/2/1.
 */

import React from 'react';

import styles from './realMonitor.less';

const AlarmFaceCard = ({ }) => (
        <div className={styles.card}>
           <div className={styles.imgContain}>
               <img className={styles.cardImg} src='' alt=""/>
               <img className={styles.cardImg} src='' alt=""/>
           </div>
            <div className={styles.cardTextWapper}>
                <span className={styles.cardText}>李寻欢</span>
                <span className={styles.cardText}>310127134505142482</span>
            </div>
            <div className={styles.cardTextWapper}>
                <span className={styles.cardText}>阿布拉比清真寺</span>
                <span className={styles.cardText}>相似度：84.25%</span>
            </div>
            <div className={styles.cardTextWapper}>
                <span className={styles.cardText}>21546</span>
                <span className={styles.cardText}>打浦桥下匝道扣前200米处</span>
            </div>
            <div className={styles.cardTextWapper}>
                <span className={styles.cardText}>2017-12-19</span>
                <span className={styles.cardText}>18:14:25</span>
            </div>
        </div>
    );

export default AlarmFaceCard;

