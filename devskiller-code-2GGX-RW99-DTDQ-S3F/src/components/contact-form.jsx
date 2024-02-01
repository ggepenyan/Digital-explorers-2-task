import React from 'react';
import { object,func } from 'prop-types';

export class ContactForm extends React.Component{

    static defaultProps = {
        data:{
            name:'',
            email:'',
            option:'',
            select: '',
            message:'',
            terms:false
        }
    }

    static propTypes = {
        onChange: func.isRequired,
        onSubmit: func.isRequired,
        data: object.isRequired
    }

    constructor(props){
        super(props);
    }

    /**
     * When form is submitted forward contact data to parent
     * @param {event} DOMEvent
     */
    handleSubmit(event){
        event.preventDefault();

        this.props.onSubmit(this.props.data);
    }

    fieldChange(event){
        let target = event.target;
        let name = event.target.name;
        let value = target.type ==='checkbox' ? target.checked : target.value;

        this.props.onChange({
            ...this.props.data,
            [name]: value,
        });
    }

    OPTIONS = [
        {id:1, label:'I have question about my membership'},
        {id:2, label:'I have technical question'},
        {id:3, label:'I would like to change membership'},
        {id:4, label:'Other question'},
    ]

    render(){
        let data = this.props.data;

        return <form onSubmit={this.handleSubmit.bind(this)} onChange={this.fieldChange.bind(this)}>

        <h3>Contact Form</h3>

        <div className="form-group">
            <label className="form-label">Your Name:</label>
            <input name="name" value={data.name} className="form-control" />
        </div>

        <div className="form-group">
            <label className="form-label">Your Best Email:</label>
            <input name="email" value={data.email} className="form-control" />
        </div>

        <label className="form-label">Select your membership option:</label>
        <div className="form-group row">
            <label className="form-label col-xs-4">
            <input type="radio" name="option" value="A" /> Option A</label>
            <label className="form-label col-xs-4">
            <input type="radio" name="option" value="B"/> Option B</label>
            <label className="form-label col-xs-4">
            <input type="radio" name="option" value="C" /> Option C</label>
        </div>

        <hr/>

        <div className="form-group">
            <label className="form-label">What can we help you with:</label>
            <select className="form-control" name="select">
                {this.OPTIONS.map((option) => (
                    <option value={option.id} key={option.id} selected={data.select == option.id}>{option.label}</option>
                ))}
            </select>
        </div>

        <div className="form-group">
            <label className="form-label">Message:</label>
            <textarea
                name="message"
                value={data.message}
                rows="10"
                placeholder="Please type your question here"
                className="form-control"
            />
        </div>

        <div className="form-group">
            <label className="form-label">
                <input type="checkbox" value={data.option} name="terms" />
                &nbsp;I agree to terms and conditions
            </label>

        </div>

            <input type="submit" value="Send" className="contactform-submit" disabled={!data.terms} />
        </form>
    }
}
