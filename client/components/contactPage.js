import React, { PropTypes, Component } from 'react';
import Header from '../containers/headerContainer';
import Footer from '../containers/footerContainer';
import { contact as validate } from '../../common/validators';

let $ = window.$;

class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                company: '',
                name: '',
                email: '',
                message: '',
            },
            validation: {
                hasErrors: false,
                errors: {},
            },
            progress: 'initial', //form progress state
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.getErrorClass = this.getErrorClass.bind(this);
        this.getErrorText = this.getErrorText.bind(this);
        this.initCaptcha = this.initCaptcha.bind(this);
        this.captchaCallback = this.captchaCallback.bind(this);
        this.captchaExpiredCallback = this.captchaExpiredCallback.bind(this);
        this.setError = this.setError.bind(this);
        this.setSuccess = this.setSuccess.bind(this);
    }

    componentDidMount() {
        document.title = 'Adaptabi - Contact';
        if (window.gRecaptchaReady) {
            this.initCaptcha();
        } else {
            this.interval = setInterval(function(){
                if (window.gRecaptchaReady) {
                    clearInterval(this.interval);
                    this.initCaptcha();
                }
            }.bind(this), 300);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    initCaptcha() {
        console.warn('initing captcha', window.grecaptcha, window.gRecaptchaReady, this.refs.captcha);
        this.recaptchaID = window.grecaptcha.render(this.refs.captcha, {
            sitekey: '6LdPnxEUAAAAAA2flZHeWiGboH9RYqAN_yax3hVm',
            callback: this.captchaCallback,
            'expired-callback': this.captchaExpiredCallback,
        });
    }

    captchaCallback(code){
        this.setState({ form: Object.assign({}, this.state.form, { captcha: code })});
        if (this.state.validation.hasErrors) {
            this.setState({ validation: validate(this.getPayload()) });
        }
    }

    captchaExpiredCallback(){
        this.setState({ form: Object.assign({}, this.state.form, { captcha: '' })});
        if (this.state.validation.hasErrors) {
            this.setState({ validation: validate(this.getPayload()) });
        }
    }

    handleChange(field, event) {
        let state = this.state;
        if (state.progress == 'sending') {
            return;
        }
        state.form[field] = event.target.value;
        this.setState(state);

        if ($(event.currentTarget).attr('type') == 'radio') {
            let label = $(event.currentTarget).parent(), container = label.parent();
            container.find('.selected').removeClass('selected');
            label.addClass('selected');
        }
    }

    handleFocus(e) {
        $(e.target).parent().addClass('focus');
    }

    handleBlur(e) {
        let val = $.trim(e.target.value);
        $(e.target).parent().removeClass('focus')[(val.length ? 'add' : 'remove') + 'Class']('has-text');
        if (val != e.target.value) {
            $(e.target).val(val);
        }
        if (this.state.validation.hasErrors) {
            this.setState({ validation: validate(this.getPayload()) });
        }
    }

    getErrorClass(field) {
        if (field == 'submit') {
            return 'error submit' + (!this.state.validation.hasErrors && ' hidden' || '');
        }
        return 'error' + (!this.state.validation.errors[field] && ' hidden' || '');
    }

    getErrorText(field) {
        if (field == 'submit') {
            return this.state.validation.errors[field] || 'Please correct the errors and try again';
        }
        return this.state.validation.errors[field];
    }

    getPayload(e) {
        let payload = Object.assign({}, this.state.form, {
            captcha: e ? e.target.elements['g-recaptcha-response'].value : this.state.form.captcha,
        });
        for (var field in payload) {
            payload[field] = $.trim(payload[field]);
        }
        return payload;
    }

    onSubmit(e) {
        e.preventDefault();
        const payload = this.getPayload(e);
        const validation = validate(payload);
        this.setState({ validation: validation });
        if (!validation.hasErrors) {
            console.warn('posting', payload);
            this.setState({ progress: 'sending' });
            $.ajax({
                url: '/api/contact',
                dataType: 'json',
                method: 'POST',
                data: payload,
                error: function() {
                    window.grecaptcha.reset(this.recaptchaID);
                    this.setError();
                }.bind(this),
                success: function(data) {
                    window.grecaptcha.reset(this.recaptchaID);
                    console.warn('success', data);
                    if (data.success) {
                        this.setSuccess();
                    } else {
                        this.setError();
                    }
                }.bind(this),
            });
        }
    }

    setError() {
        this.setState({
            progress: 'initial',
            validation: {
                hasErrors: true,
                errors: {
                    'submit': 'Sorry, it didn\'t work. Please try again later or contact us by other means on this page.',
                },
            },
        });
    }

    setSuccess(){
        this.setState({ progress: 'done' }); 
        setTimeout(function(){ 
            this.setState({ progress: 'initial' }); 
        }.bind(this), 1000);
    }

    render() {
        const form = this.state.form;
        let button = null;
        switch (this.state.progress) {
            case 'sending':
                button = <button type="submit" disabled>Sending</button>;
            break;
            case 'done':
                button = <button type="submit" className="done" disabled>Thanks!</button>;
            break;
            case 'initial':
            default:
                button = <button type="submit">Send!</button>;
            break;
        }

        return (
            <article className="page page-contact" ref="article">
                <Header ref={'header'} title={'Contact Us'} highlightContact />
                <section className="content">
                    <div className="spacer-100"/>
                    <div className="row">
                        <form onSubmit={this.onSubmit} className="large-9 large-offset-3 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <h1 className="content-item">Let's talk!</h1>
                            <div className="row">
                                <div className="field content-item large-16 columns">
                                    <label htmlFor="company-name">Company name *</label>
                                    <input id="company-name" type="text" value={form.company} onChange={this.handleChange.bind(this, 'company')} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                                    <span className={this.getErrorClass('company')}>{this.getErrorText('company')}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field content-item large-16 columns">
                                    <label htmlFor="name">Name *</label>
                                    <input id="name" type="text" value={form.name} onChange={this.handleChange.bind(this, 'name')} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                                    <span className={this.getErrorClass('name')}>{this.getErrorText('name')}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field content-item large-8 columns">
                                    <label htmlFor="email">E-mail *</label>
                                    <input id="email" type="text" value={form.email} onChange={this.handleChange.bind(this, 'email')} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                                    <span className={this.getErrorClass('email')}>{this.getErrorText('email')}</span>
                                </div>
                                <div className="field content-item large-8 columns">
                                    <label htmlFor="phone">Telephone</label>
                                    <input id="phone" type="tel" value={form.phone} onChange={this.handleChange.bind(this, 'phone')} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                                    <span className={this.getErrorClass('phone')}>{this.getErrorText('phone')}</span>
                                </div>
                            </div>
                            <div className="spacer-40"/>
                            <div className="row">
                                <div className="field content-item large-8 large-offset-0 columns">
                                    <h4>Your type?</h4>
                                    <label className="radio"><input type="radio" name="who" value="startup" onChange={this.handleChange.bind(this, 'who')} /> Startup</label>
                                    <label className="radio"><input type="radio" name="who" value="business" onChange={this.handleChange.bind(this, 'who')} /> Business</label>
                                    <label className="radio"><input type="radio" name="who" value="enterprise" onChange={this.handleChange.bind(this, 'who')} /> Enterprise</label>
                                </div>
                                <div className="field content-item large-8 columns">
                                    <h4>Your need?</h4>
                                    <label className="radio"><input type="radio" name="what" value="website" onChange={this.handleChange.bind(this, 'what')} /> Website</label>
                                    <label className="radio"><input type="radio" name="what" value="software" onChange={this.handleChange.bind(this, 'what')} /> Software</label>
                                    <label className="radio"><input type="radio" name="what" value="mobile" onChange={this.handleChange.bind(this, 'what')} /> Mobile app</label>
                                </div>
                                <div className="field content-item large-8 columns">
                                    <h4>Your budget?</h4>
                                    <label className="radio"><input type="radio" name="budget" value="low" onChange={this.handleChange.bind(this, 'budget')} /> $20k - $30k</label>
                                    <label className="radio"><input type="radio" name="budget" value="medium" onChange={this.handleChange.bind(this, 'budget')} /> $30k - $50k</label>
                                    <label className="radio"><input type="radio" name="budget" value="high" onChange={this.handleChange.bind(this, 'budget')} /> $50k+</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field content-item large-16 large-offset-0 columns">
                                    <label htmlFor="message">Message *</label>
                                    <textarea id="message" value={form.message} onChange={this.handleChange.bind(this, 'message')} onFocus={this.handleFocus} onBlur={this.handleBlur}></textarea>
                                    <span className={this.getErrorClass('message')}>{this.getErrorText('message')}</span>
                                </div>
                            </div>
                            <footer className="row">
                                <div className="field content-item large-18 large-offset-0 columns">
                                    <div ref="captcha"></div>
                                    <span className={this.getErrorClass('captcha')}>{this.getErrorText('captcha')}</span>
                                </div>
                                <div className="content-item large-6 large-offset-0 columns">
                                    {button}
                                </div>
                                <span className={this.getErrorClass('submit')}>{this.getErrorText('submit')}</span>
                            </footer>
                            <div className="spacer-40"/>
                        </form>
                        <div className="large-9 large-offset-0 medium-22 medium-offset-1 small-22 small-offset-1 columns">
                            <div className="row">
                                <ul>
                                    <li className="content-item e-mail"><span className="bold">E-mail: </span> <a href="mailto:hello@adaptabi.com?subject=Inquiry"><span>hello@adaptabi.com</span></a></li>
                                </ul>
                            </div>
                            <div className="spacer-20"/>
                            <div className="row">
                                <ul>
                                    <li className="content-item bold">Romania: </li>
                                    <li className="content-item"><span className="no-break">Sos.Tudor Neculai</span> <span className="no-break">nr.52 D, </span> <span className="no-break">Iasi, </span> 700732</li>
                                    <li className="content-item"><a href="tel:+40729046526"><span>+40</span> <span>729 </span> <span>046</span> <span>526</span></a></li>
                                </ul>
                            </div>
                            <div className="spacer-20"/>
                            <div className="row">
                                <ul>
                                    <li className="content-item bold">United Kingdom: </li>
                                    <li className="content-item"><span className="no-break">Prospect House, </span> <span className="no-break">2 Athenaeum Rd, </span> <span className="no-break">London, </span> <span className="no-break">N20 9AE</span></li>
                                    <li className="content-item"><a href="tel:+4407956809631"><span>+44</span> <span>(0) </span> <span>795 </span> <span>680</span> <span>9631</span></a></li>
                                </ul>
                            </div>                    
                            <div className="spacer-20"/>
                            <div className="row">
                                <div>
                                    <h1 className="content-item">Everything changes but our passion!</h1>
                                </div>
                            </div>
                            <div className="row">
                                <ul>
                                    <li className="content-item social-media">
                                        <a target="_blank" href="http://lnked.in/adaptabi" className="linkedin"><i className="ncs-linkedin-square" /></a>
                                        <a target="_blank" href="https://www.facebook.com/adaptabi/" className="facebook"><i className="ncs-facebook-square" /></a>
                                        <a target="_blank" href="https://twitter.com/adaptabidev" className="twitter"><i className="ncs-twitter" /></a>
                                        <a target="_blank" href="https://blog.adaptabi.com" className="medium"><i className="ncs-medium" /></a>
                                    </li>
                                </ul>
                            </div>
                            <div className="spacer-60" />
                        </div>
                    </div>
                </section>
                <Footer />
            </article>
        );
    }
}

export default ContactPage;
