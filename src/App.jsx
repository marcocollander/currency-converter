import Header from './components/Header/Header';
import Form from './components/Form/Form';

const App = () => (

    <div className='wrapper'>
        <Header />
        <Form placeholder={'Wpisz wartość'} flag={true} />
        <Form placeholder={'Wpisz wartość'} flag={false}/>
    </div>
);

export default App;
