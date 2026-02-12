import React from 'react';
import MainMenuPanel from '../components/MainMenuPanel';
import BrandsComponent from '../components/BrandsComponent';
import UserComponent from '../components/UserComponent';
import InfoTab from '../components/InfoTab';
import HeaderPanel from '../components/HeaderPanel';
import HeaderTabsPanel from '../components/HeaderTabsPanel';
import UserFormComponent from '../components/UserFormComponent';
import DbAdminComponent from '../components/configurator/DbAdminComponent';
import ModelSchemasComponent from '../components/configurator/ModelSchemasComponent';
import DataBaseSchemasComponent from '../components/configurator/DataBaseSchemasComponent';
import CompareSchemasComponent from '../components/configurator/CompareSchemasComponent';
import ManageDbStructureComponent from '../components/configurator/ManageDbStructureComponent';
import ToolEntryForSharpeningForm from '../components/documents/ToolEntryForSharpening/forms/form';
import ToolEntryForSharpeningList from '../components/documents/ToolEntryForSharpening/lists/list';

const VPE = () => {
  // console.log('VPE component mounted');
  const [showMenu, setShowMenu] = React.useState(false);
  const initialTabs = JSON.parse(localStorage.getItem('tabs') || '[]');
  const [tabs, setTabs] = React.useState(initialTabs);
  const initialActiveTab = localStorage.getItem('activeTab') || (tabs.length > 0 ? tabs[0] : '');
  const [activeTab, setActiveTab] = React.useState(initialActiveTab);
  const username = localStorage.getItem('username') || 'err user';

  const addTab = (menuItem) => {
    // if (!tabs.some(tab => tab.id === menuItem.id)) {
    // if (!tabs.some(tab => tab.title === menuItem.title)) {
    if (!tabs.some(tab => tab.command === menuItem.command)) {
        setTabs([...tabs, menuItem]);
        setActiveTab(menuItem.command);
    } else {
      setActiveTab(menuItem.command);
    }
  };

  React.useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  React.useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const activeTabObj = tabs.find(tab => tab.command === activeTab);
  // console.log('activeTab:', activeTab);
  // console.log('tabs:', tabs);
  // console.log('activeTabObj:', activeTabObj);

  const getTabContent = (tab) => {

  // console.log('getTabContent - tab:', tab);
  // console.log('activeTabObj:', activeTabObj);
  // console.log('allTabs:', tabs);
   
  switch (tab.command) {
    case 'openBrandsList':
      return <BrandsComponent />;
    case 'openUsersList':
      return <UserComponent addTab={addTab} />;
    case 'addUser':
      return <UserFormComponent />;
    case 'openInfo':
      return <InfoTab addTab={addTab}/>;
    case 'openDBA':
      return <DbAdminComponent addTab={addTab} />;
    case 'openModelSchemas':
      return <ModelSchemasComponent />;
    case 'openDataBaseSchemas':
      return <DataBaseSchemasComponent />;
    case 'openCompareSchemas':
      return <CompareSchemasComponent/>;  
    case 'openManageDb':
      return <ManageDbStructureComponent/>;  
    case 'openToolEntryForSharpening':
      return <ToolEntryForSharpeningList addTab={addTab}/>;  
    case 'addToolEntryForSharpening':
      return <ToolEntryForSharpeningForm addTab={addTab} />;  
    default:
      return null;
    } 
  };

  return (
    <div>
      <HeaderPanel
        onMenuClick={() => setShowMenu(true)}
        onInfoClick={() => addTab({ title: 'VPE', command: 'openInfo' })}
      />
    <HeaderTabsPanel
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setTabs={setTabs}
    />      
      <MainMenuPanel showMenu={showMenu} setShowMenu={setShowMenu} addTab={addTab} />
      <div>
        {activeTabObj && getTabContent(activeTabObj)}
    </div>
      <style>{`
        .tab-item:hover {
        }
      `}</style>
    </div>
    
  );
  
};

export default VPE;

