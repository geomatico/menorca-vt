import React from 'react';
import SectionTitle from '../SectionTitle';


const PlanningIndicators = () => {
  return <>
    <SectionTitle titleKey='Llicències obra major reforma/obra nova'/>
    <SectionTitle titleKey='Evolució superfícies totals per any i tipus de superfície'/>
    <SectionTitle titleKey='Evolució superfícies per any i tipus superfície agrupats per intèrval de superfície'/>
    <SectionTitle titleKey='Pressupost total dels projectes per any i tipus agrupats per intèrvals de preu'/>
    <SectionTitle titleKey='Inequitat promotor'/>
    <SectionTitle titleKey='Inequitat arquitecte'/>
  </>;
};

PlanningIndicators.propTypes = {
};

export default PlanningIndicators;