import React from 'react';
import { Text, View, StatusBar, Navigator, Image, TouchableHighlight } from 'react-native';

import Main from './Main';
import Menu from './Menu';
import Dashboard from './Dashboard';
import PContractTab from './PContract/PContractTab';
import PurchaseHome from './Purchase/PurchaseHome';
import QualityHome from './Quality/QualityHome';
import ReceiveHome from './Received/ReceiveHome';
import SaleHome from './Sales/SaleHome';

import StockHome from './Stock/StockHome';
import StockProduct from './Stock/StockProduct';
import StockProductStack from './Stock/StockProductStack';
import StockZone from './Stock/StockZone';
import StockZoneStack from './Stock/StockZoneStack';

import SupplierHome from './Supplier/SupplierHome';

import IntakeQuality from './Report/IntakeQuality';
import IntakeQualitySupplier from './Report/IntakeQualitySupplier';
import IntakeQtySupStack from './Report/IntakeQtySupStack';

import { StackNavigator } from 'react-navigation';
import icMenu from '../img/ic_menu.png';

export default StackNavigator({
    Main: { screen: Main,
        navigationOptions: {
            header: null,
        },
    },

    Menu: { screen: Menu,
        navigationOptions: {
            title: 'Menu',
        },
    },
    Dashboard: { screen: Dashboard,
        navigationOptions: {
            title: 'Dashboard',
        },
    },
    PContractTab: { screen: PContractTab},

    PurchaseHome: { screen: PurchaseHome,
        navigationOptions: {
            title: 'Purchase Home',
        },
    },
    QualityHome: { screen: QualityHome,
        navigationOptions: {
            title: 'Quality Home',
        },
    },
    ReceiveHome: { screen: ReceiveHome,
        navigationOptions: {
            title: 'Receive Home',
        },
    },
    SaleHome: { screen: SaleHome,
        navigationOptions: {
            title: 'Sales Home',
            headerBackTitle: 'Back',
        },
    },

    StockHome: { screen: StockHome,
        navigationOptions: {
            title: 'STOCK STACK',
        },
    },
    StockProduct: { screen: StockProduct,
        navigationOptions: {
            title: 'Group Prod. Detail',
        },
    },
    StockProductStack: { screen: StockProductStack,
        navigationOptions: {
            title: 'Prod. Stack Detail',
        },
    },
    StockZone: { screen: StockZone,
        navigationOptions: {
            title: 'Group Zone Detail',
        },
    },
    StockZoneStack: { screen: StockZoneStack,
        navigationOptions: {
            title: 'Zone Stack Detail',
        },
    },

    SupplierHome: { screen: SupplierHome,
        navigationOptions: {
            title: 'Supplier Home',
        },
    },
    IntakeQuality: { screen: IntakeQuality,
        navigationOptions: {
            title: 'Intake Quality Home',
        },
    },
    IntakeQualitySupplier: { screen: IntakeQualitySupplier,
        navigationOptions: {
            title: 'Intake Qty by Supplier',
        },
    },
    IntakeQtySupStack: { screen: IntakeQtySupStack,
        navigationOptions: {
            title: 'Detail Quality',
        },
    },
});
// export default class CompNavigator extends Component {
//   render() {
//     return (
//       <Navigator
//         initialRoute={{ name: 'DASHBOARD'}}
//         renderScence={(route, navigator) => {
//           switch (route.name) {
//             case 'DASHBOARD': return <Dashboard navigator={navigator} />;
//             case 'PCONTRACT_HOME': return <PContractHome navigator={navigator} />;
//             case 'PUR_HOME': return <PurchaseHome navigator={navigator} />;
//             case 'QTY_HOME': return <QualityHome navigator={navigator} />;
//             case 'RECEI_HOME': return <ReceiveHome navigator={navigator} />;
//             case 'SALE_HOME': return <SaleHome navigator={navigator} />;
//             case 'STOCK_HOME': return <StockHome navigator={navigator} />;
//             default: return <SupplierHome navigator={navigator} />;
//           }
//         }}
//       />
//     );
//   }
// }
