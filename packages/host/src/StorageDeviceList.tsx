import React, { useEffect, useState } from 'react';
import './storagelist.scss';

interface StorageDevice {
    id: number;
    name: string;
    capacity: string;
    hostName: string;
    driveName: string;
    volumeName: string;
    nodeName: string;
    diskName: string;
}

const StorageDeviceList: React.FC = (compProps: any) => {
    const [storageDevices, setStorageDevices] = useState<StorageDevice[] | []>([]);
    const [selectedDevice, setSelectedDevice] = useState<StorageDevice | null>(null);

    // Function to fetch the list of storage devices
    let devicesData = [
        {
            id: 1, name: "apm00145042834", capacity: "125GB", hostName: "matacan.storage.tucson.ibm.com",
            driveName: "shrimp8",
            volumeName: "vol0",
            nodeName: "ACH Node1",
            diskName: " disk1 "
        },
        {
            id: 2, name: "v7000-ford1", capacity: "235GB", hostName: "reloba.storage.tucson.ibm.com",
            driveName: "shrimp7",
            volumeName: "vol1",
            nodeName: "ACH Node2 ",
            diskName: " disk2 "
        },
        {
            id: 3, name: "tpcv5k4", capacity: "15GB", hostName: "shrimp.storage.tucson.ibm.com",
            driveName: "shrimp6",
            volumeName: "vol2",
            nodeName: "ACH Node3 ",
            diskName: " disk3 "
        },
        {
            id: 4, name: "Storwiz", capacity: "425GB", hostName: "amador.storage.tucson.ibm.com",
            driveName: "drive5",
            volumeName: "vol3",
            nodeName: "ACH Node4 ",
            diskName: " disK4 "
        },
        {
            id: 5, name: "flyer 7825410", capacity: "125GB", hostName: "cohiba.storage.tucson.ibm.com",
            driveName: "Drive6",
            volumeName: "vol4",
            nodeName: "ACH Node5",
            diskName: "disk5"
        },
        {
            id: 6, name: "xiv 7811012", capacity: "125GB", hostName: "tpc-accelerate.storage.tucson.ibm.com",
            driveName: "Drive7",
            volumeName: " vol5 ",
            nodeName: "ACH Node6 ",
            diskName: " disk6 "
        },
        {
            id: 7, name: "svc-svc2a", capacity: "125GB", hostName: "crawfish.storage.tucson.ibm.com",
            driveName: "Drive8",
            volumeName: " vol6 ",
            nodeName: "Node 1 ",
            diskName: " disk7"
        },
        {
            id: 8, name: "svc-1", capacity: "125GB", hostName: "krill.storage.tucson.ibm.com",
            driveName: "013Drive",
            volumeName: " vol7 ",
            nodeName: "node 2 ",
            diskName: " disk8 "
        },
        {
            id: 9, name: "s9110shared3-ACH", capacity: "125GB", hostName: "basalt.storage.tucson.ibm.com",
            driveName: "9ACO12",
            volumeName: " vol8 ",
            nodeName: "node 3 ",
            diskName: "disk8"
        }
    ];

    useEffect(() => {

        if (compProps?.selectedDevice) {
            setSelectedDevice(compProps.selectedDevice);
        }

        setStorageDevices(devicesData);

        window.addEventListener('dataEvent', handleDataEvent);

        return () => {
            window.removeEventListener('dataEvent', handleDataEvent);
        };
    }, []);

    const handleDataEvent = (event: CustomEvent<any>) => {
        const data = event.detail;
        devicesData.push(data);
        setStorageDevices(devicesData);
        setSelectedDevice(data);
    };



    const handleDeviceSelect = (device: StorageDevice) => {
        setSelectedDevice(device);
        compProps.passAddedDevice(device);
    };

    return (
        <div>
            <h1>Storage Devices</h1>
            {storageDevices.length === 0 ? (
                <p>No storage devices found.</p>
            ) : (
                <div className="left-content">
                    <ul className="device-list">
                        {storageDevices.map((device) => (
                            <li key={device.id} className={`device-item ${device.id === selectedDevice?.id ? 'selected' : ''} ${device.id % 2 !== 0 ? 'bg-color' : ''}`}
                                onClick={() => handleDeviceSelect(device)}>
                                <span className="device-name">{device.name}</span>
                                <span className="device-capacity">{device.capacity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StorageDeviceList;
