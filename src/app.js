import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Row, Col} from 'react-bootstrap';
import HomePage from './components/home';
import Advantage from './components/advantage';
import Discover from './components/discover';
import Testimonial from './components/testimonials';
import Outtro from './components/outtro_cta';
import Footer from './components/footer';
import CustomNavbar from './components/navbar';
import DiscoverApp from './components/discoverApp';
import OpporunityApp from './components/opporunityApp';
import AuthApp from './components/auth';
import AccountApp from './components/accountApp';
import OrderApp from './components/order';


function LandingPage() {
  return (<div>
          <HomePage></HomePage>
          <Advantage></Advantage>
          <Discover></Discover>
          <Testimonial></Testimonial>
          <Outtro></Outtro>
          <Footer></Footer>
        </div>);
}

function DiscoverPage() {
  return (<div>
          <div className='container'>
            <Row>
            <CustomNavbar></CustomNavbar>
            </Row>
          </div>
          <DiscoverApp></DiscoverApp>
          <Footer></Footer>
        </div>);
}

function OpporunityPage({match}) {
  console.log(match.params.id)
  return (<div>
          <div className='container'>
            <Row>
            <CustomNavbar></CustomNavbar>
            </Row>
          </div>
          <OpporunityApp id={match.params.id}></OpporunityApp>
          <Footer></Footer>
        </div>);
}

function AuthPage({match}) {
  console.log(match.params.id)
  return (<div>
          <div className='container'>
            <Row>
            <CustomNavbar></CustomNavbar>
            </Row>
          </div>
          <Col xs={{span:'10', offset:'1'}} lg={{span:'4', offset:'4'}}>
            <AuthApp id={match.params.id}></AuthApp>
          </Col>
          <Footer></Footer>
        </div>);
}

function AccountPage() {
  return (<div>
          <div className='container'>
            <Row>
            <CustomNavbar></CustomNavbar>
            </Row>
          </div>
          <AccountApp></AccountApp>
          <Footer></Footer>
        </div>);
}

function OrderPage({match}) {
  console.log(match.params.id)
  return (<div>
          <div className='container'>
            <Row>
            <CustomNavbar></CustomNavbar>
            </Row>
          </div>
          <OrderApp id={match.params.id}></OrderApp>
          <Footer></Footer>
        </div>);
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  

  render() {
    // return (
    //   <div>
    //     <HomePage></HomePage>
    //     <Advantage></Advantage>
    //     <Discover></Discover>
    //     <Testimonial></Testimonial>
    //     <Outtro></Outtro>
    //     <Footer></Footer>
    //   </div>
    // )

    return (
      <Router>
        <div>
          <Route path="/" exact component={LandingPage} />
          <Route path="/discover/" component={DiscoverPage} />
          <Route path="/opportunity/:id" component={OpporunityPage} />
          <Route path="/auth/:id" component={AuthPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/order/:id" component={OrderPage} />

        </div>
      </Router>
    );
  }
}

export default App;




// function Index() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }

// function AppRouter() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about/">About</Link>
//             </li>
//             <li>
//               <Link to="/users/">Users</Link>
//             </li>
//           </ul>
//         </nav>

//         <Route path="/" exact component={Index} />
//         <Route path="/about/" component={About} />
//         <Route path="/users/" component={Users} />
//       </div>
//     </Router>
//   );
// }

// export default AppRouter;

