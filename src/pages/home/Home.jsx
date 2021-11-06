import React from 'react'
import {Link} from 'react-router-dom';
import LeftSide from '../../components/leftSide/LeftSide';
import Main from '../../components/main/Main';
import RightSide from '../../components/rightSide/RightSide';
import {Container,
    Section,
    Layout,
} from './homeStyle';

function Home() {
    return (
        <Container>
            <Section>
                <h5><Link to="/">Hiring in a hurry? -</Link></h5>
                <p>Find talanted pros in record time with upwork and keep business moving.</p>
            </Section>
            <Layout>
                <LeftSide />
                <Main />
                <RightSide />
            </Layout>
        </Container>
    )
}

export default Home;
