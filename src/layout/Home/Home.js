import React, { useEffect } from 'react';

import { Cover } from './Cover';
import { Header } from './Header';
import { Advertise } from './Advertise';
import { VideoCall } from './VideoCall';
import { Specialty } from './Specialty';
import { Clinic } from './Clinic';
import { Doctor } from './Doctor';
import { Handbook } from './Handbook';
import { Footer } from '../../common/Footer';

function Home() {
    return (
        <React.Fragment>
            <Header home={true} />
            <Cover />
            <Advertise />
            {/* <VideoCall /> */}
            <Specialty />
            {/* <Clinic /> */}
            <Doctor />
            {/* <VideoCall /> */}
            {/* <Handbook /> */}
            <Footer />
        </React.Fragment>
    );
}

export default Home;
