import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

const data = {
    labels: ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"],
    datasets: [{
        data: [84, 86, 88, 111, 101, 60]
    }]
}

export default class RadarChart extends Component {
    render() {
        return (
            <Radar data={data}/>
        )
    }
}