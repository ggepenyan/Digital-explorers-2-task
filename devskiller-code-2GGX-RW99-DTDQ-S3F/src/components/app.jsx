import React from 'react'
import { ContactForm } from './contact-form'
import { Message } from './message'
import { UserPanel } from './user-panel'


export class App extends React.Component{

    CONTACT_FORM_DEFAULTS = {
        name: '',
        email: '',
        option:'A',
        select: 1,
        message:'',
        terms: false,
    }
    USER_DATA = {
        name:'Test User',
        email:'user@example.com'
    }

    constructor(props){
        super(props)
        this.state = {
            contact: {...this.CONTACT_FORM_DEFAULTS},
            sent: false,
            currentUser: null
        };
    }

    contactChanged(contact){
        this.setState({
            contact
        });
    }

    sendContact(contact){
        console.log(contact, ';;;');
        const formIsValid = !Object.values(this.state.contact).includes('');
        if (formIsValid) {
            // For now just mark it as `sent`
            this.setState({
                sent: true
            });
        }
    }

    logIn() {
        this.setState((prevState) => ({
            ...prevState,
            contact: {
                ...prevState.contact,
                ...this.USER_DATA,
            },
            currentUser: this.USER_DATA,
        }));
    }


    render(){
        return <div className="container">
            <div className="row">
                {this.state.currentUser ? (
                    <div className="col-md-12">
                        <div className="pull-right">
                            <UserPanel user={this.state.currentUser} />
                        </div>
                    </div>
                ) : (
                    <div className="col-md-12">
                        <div className="pull-right">
                            <button className="btn btn-default" onClick={this.logIn.bind(this)}>
                                <i className="glyphicon glyphicon-user"></i> Log In
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {this.state.sent ? (
                <div className="row">
                    <div className="col-md-12">
                        <Message header={'Thank You'} text={'We will reply to your message in next 24h. Have a nice day! ;-)'} />
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-4">
                        <h2>Contact us</h2>
                        <p>Please fill in form on the right to get fast reply</p>
                        <img style={{width:'100%'}} src="http://via.placeholder.com/300x200" alt="contact us" />
                    </div>
                    <div className="col-md-8">
                        <ContactForm
                            data={this.state.contact}
                            onChange={this.contactChanged.bind(this)}
                            onSubmit={this.sendContact.bind(this)}
                        />
                    </div>
                </div>
            )}
        </div>
    }
}
