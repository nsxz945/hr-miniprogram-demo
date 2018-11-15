import React, { Component, Fragment } from 'react';
import './style.css'
let content = React.createRef()
class Bot extends Component {
    constructor(props) {
        super(props)
        this.restQuestion = [
            [<Msg name='2-0-1' />, <Question options={['2-0-2', '2-0-3', '2-0-4', '2-0-5']} answers={['2.1', '2.2', '2.3', '2.4']} replaceLast={this.replaceLast} afterAnswered={this.afterAnswered} />],
            [<Msg name='3-0-1' />, <Question options={['3-0-2', '3-0-3', '3-0-4', '3-0-5']} answers={['3.1', '3.2', '3.3', '3.4']} replaceLast={this.replaceLast} afterAnswered={this.afterAnswered} />]
        ]
    }
    state = {
        messages: [<Msg name='0-1' />, <Msg name='0-2' onClick={() => {
            this.replaceLast([<Msg name='1-0-1' />, <Question options={['1-0-2', '1-0-3', '1-0-4', '1-0-5']} answers={['1.1', '1.2', '1.3', '1.4']} replaceLast={this.replaceLast} afterAnswered={this.afterAnswered} />])
        }} />],
        shouldScrollToEnd: false
    }
    addMessage = (item) => {
        if (Array.isArray(item)) {
            this.setState(({ messages }) => ({
                messages: [...messages, ...item],
                shouldScrollToEnd: true
            }))
        } else {
            this.setState(({ messages }) => ({
                messages: [...messages, item],
                shouldScrollToEnd: true
            }))
        }
    }
    deleteLast = (number) => {
        if (number) {
            this.setState(({ messages }) => {
                return { messages: messages.slice(0, -number) }
            })
        } else {
            this.setState(({ messages }) => {
                messages.pop()
                return { messages: [...messages] }
            })
        }
    }
    replaceLast = (item, number) => {
        this.deleteLast(number)
        this.addMessage(item)
    }
    afterAnswered = () => {
        if (this.restQuestion.length > 0) {
            setTimeout(() => {
                this.addMessage(this.restQuestion.pop())
            }, 600);
        } else {
            setTimeout(() => {
                this.addMessage(<Msg name='end' />)
            }, 1000);
        }
    }
    scrollToEnd = () => {
        let contentEle = content.current
        if (contentEle) {
            contentEle.scrollTop = contentEle.scrollHeight
        }
    }
    render() {
        return (
            <div className='container' >
                <div className='header'><img src={require('./assets/header.png')} alt='' width='100%' /></div>
                <div className='content' ref={content}>
                    {this.state.messages.map(item => item)}
                </div>
                <div className='footer'> <img src={require('./assets/footer.png')} alt='' width='100%' /></div>
            </div>
        )
    }
}

let scrollToEnd = () => {
    let contentEle = content.current
    if (contentEle) {
        contentEle.scrollTop = contentEle.scrollHeight
    }
}

function Msg(props) {
    let { name, onClick = () => null } = props
    return <img key='name' src={require(`./assets/${name}.png`)} alt='' onClick={onClick} onLoad={scrollToEnd} />
}

function Question(props) {
    let { des, options, answers, replaceLast, afterAnswered } = props
    return <Fragment>
        {/* <Msg name={des} /> */}
        {options.map((name, index) => {
            return <Msg name={name} onClick={() => { replaceLast(<Msg name={answers[index]} />); afterAnswered() }} />
        })}
    </Fragment>
}
export default Bot;
