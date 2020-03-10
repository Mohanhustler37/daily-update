import React, { Component } from 'react'
import MainLayout from '../MainLayout/MainLayout'
import OkrCollapsible from '../TaskTable/OkrCollapsible/OkrCollapsible'
import Objectives from './Objectives'
export default class OkrObjectives extends Component {
    render() {
        return (
            <MainLayout secondSidebar={<OkrCollapsible />} bodySection={<Objectives />}/>
        )
    }
}
