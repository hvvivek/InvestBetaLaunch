import React, {Component} from 'react';
import HomePage from './components/home';
import Advantage from './components/advantage';
import Discover from './components/discover';
import Testimonial from './components/testimonials';
import Outtro from './components/outtro_cta';
import Footer from './components/footer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <HomePage></HomePage>
        <Advantage></Advantage>
        <Discover></Discover>
        <Testimonial></Testimonial>
        <Outtro></Outtro>
        <Footer></Footer>
      </div>
    )
  }
}

export default App;