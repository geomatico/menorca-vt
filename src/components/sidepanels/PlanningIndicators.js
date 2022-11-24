import React from 'react';
import SectionTitle from '../SectionTitle';


const PlanningIndicators = () => {
  return <>
    <SectionTitle titleKey='Llicències obra major reforma/obra nova'/>
    <SectionTitle titleKey='Evolució superficies totals per any i tipus de superficie'/>
    <SectionTitle titleKey='Evolució superficies per any i tipus superficie agrupats per intèrval de superficie'/>
    <SectionTitle titleKey='Pressupost total dels projectes per any i tipus agrupats per intèrvals de preu'/>
    <SectionTitle titleKey='Inequitat promotor'/>
    <SectionTitle titleKey='Inequitat arquitecte'/>
  </>;
};

PlanningIndicators.propTypes = {
};

export default PlanningIndicators;