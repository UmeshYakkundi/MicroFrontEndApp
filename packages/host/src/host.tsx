import React, { useEffect, useState } from 'react';
// import { DataSet } from "vis-data/peer";
import StorageDeviceList from './StorageDeviceList';
import Layout from 'Layout/Layout';
import './body.scss';
const Header = React.lazy(() => import('Header/Header'));
const AddDevice = React.lazy(() => import('AddDevice/AddDevice'));

import '../details/dist/712';
import '../details/dist/main';
import '../details/dist/polyfills';
import '../details/dist/remoteEntry';
import '../details/dist/styles.css';

interface IUtility {
    name: string;
    passingFun: Function;
}

const Host: React.FC = () => {

    const [selectedDevice, setSelectedDevice] = useState({
        id: 1, name: "apm00145042834", capacity: "125GB", hostName: "matacan.storage.tucson.ibm.com",
        driveName: "shrimp8",
        volumeName: "vol0",
        nodeName: "ACH Node1",
        diskName: " disk1 "
    });
    const passAddedDevice = (data) => {
        setSelectedDevice(data);
        document.dispatchEvent(new CustomEvent('app-component-event', { detail: data }));
    };

    useEffect(() => {
        passAddedDevice(selectedDevice);
        return () => {
        };
    }, []);

    return (
        <div>
            <React.Suspense fallback="Loading...">
                <div className="wrapper">
                    <Header />
                    <article className="main">
                        <h2>Storage Device Details</h2>
                        <div className="content">
                            <app-component/>
                        </div>
                    </article>
                    <aside className="aside aside-1"><StorageDeviceList selectedDevice={selectedDevice} passAddedDevice={passAddedDevice}/></aside>
                    <aside className="aside aside-2"><AddDevice selectedDevice={selectedDevice} passAddedDevice={passAddedDevice} /></aside>
                    <footer className="footer">
                        <div>
                        {Layout.template}
                        </div>
                    </footer>
                </div>
            </React.Suspense>
        </div>
    );
};

export default Host;