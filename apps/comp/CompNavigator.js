import React from 'react';
import { Text, View, StatusBar, Navigator } from 'react-native';

import Main from './Main';
import Menu from './Menu';
import Dashboard from './Dashboard';
import PContractTab from './PContract/PContractTab';
import PurchaseHome from './Purchase/PurchaseHome';
import QualityHome from './Quality/QualityHome';
import ReceiveHome from './Received/ReceiveHome';
import SaleHome from './Sales/SaleHome';
import StockHome from './Stock/StockHome';
import SupplierHome from './Supplier/SupplierHome';
import { StackNavigator } from 'react-navigation';

StatusBar.setHidden(true);

export default StackNavigator({
    Main: { screen: Main,
        navigationOptions: {
            title: 'Main',
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
      //     navigationOptions: {
      //       title: 'PContractHome',
      //       headerBackTitle: 'Back',
      //   },
      // },
    PurchaseHome: { screen: PurchaseHome,
        navigationOptions: {
            title: 'PurchaseHome',
        },
    },
    QualityHome: { screen: QualityHome,
        navigationOptions: {
            title: 'QualityHome',
        },
    },
    ReceiveHome: { screen: ReceiveHome,
        navigationOptions: {
            title: 'ReceiveHome',
        },
    },
    SaleHome: { screen: SaleHome,
        navigationOptions: {
            title: 'SaleHome',
            headerBackTitle: 'Back',
        },
    },
    StockHome: { screen: StockHome,
        navigationOptions: {
            title: 'StockHome',
        },
    },
  SupplierHome: { screen: SupplierHome,
        navigationOptions: {
            title: 'SupplierHome',
        },
    }
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
