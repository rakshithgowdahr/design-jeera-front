import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '../../../Form/Button/Button'
import Input from '../../../Form/Input/Input'
import { conf } from '../../../../../conf/conf';
const Subscriptions = () => {
    const [paypalKey, setPaypalKey] = useState("")
    const [stripeKey, setStripeKey] = useState("")
    const [isSubscriptionEnabled, setisSubscriptionEnabled] = useState(false)
    const [monthly, setmonthly] = useState(0)
    const [yearly, setyearly] = useState(0)
    useEffect(() => {
        axios.post(conf.endPoint + "/api/getMeta").then((resp) => {
            if (resp.data.length > 0) {
                setPaypalKey(resp.data[0].paypalKey)
                setStripeKey(resp.data[0].stripeKey)
                setisSubscriptionEnabled(resp.data[0].subscription)
                setmonthly(resp.data[0].monthly)
                setyearly(resp.data[0].yearly)
            }
        })
    }, [])
    const handleSubmit = () => {
        axios.post(conf.endPoint + "/api/edit/metadata/subscription", {
            data: {
                paypalKey: paypalKey,
                stripeKey: stripeKey,
                subscription: isSubscriptionEnabled,
                monthly: monthly,
                yearly: yearly,
            }
        }, { withCredentials: true }
        ).then((resp) => {
            if (resp) {
            }
        })
    }
    const handleInputs = (name, event) => {
        switch (name) {
            case "Paypal Key":
                setPaypalKey(event.target.value)
                break;
            case "Stripe":
                setStripeKey(event.target.value)
                break;
            case "Monthly":
                setmonthly(event.target.value)
                break;
            case "Yearly":
                setyearly(event.target.value)
                break;
            case "isEnabled":
                setisSubscriptionEnabled(event.target.checked)
                break;
            default:
                break;
        }
    }
    return (
        <div className="settings__meta">
            <div className="settings__title">
                <span>In here you can configure your subscriptions details.</span>
                <form className="settings__form">
                    <Input title="Paypal client key" handleInputs={handleInputs} value={paypalKey} name="Paypal Key" />
                    <Input title="Stripe client key" handleInputs={handleInputs} value={stripeKey} name="Stripe" />
                    <Input title="Monthly price" handleInputs={handleInputs} value={monthly} name="Monthly" />
                    <Input title="Yearly price" handleInputs={handleInputs} value={yearly} name="Yearly" />
                    <div>Enable Subscriptions</div>
                    <input checked={isSubscriptionEnabled == true ? true : false} onChange={(event) => {
                        handleInputs('isEnabled', event)
                    }} type="checkbox" id="vehicle1" name="vehicle1" value="Enable" />
                    <div className="admin__actionBtn">
                        <Button onClick={() => { handleSubmit() }} type="outlined" value={"submit"} />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Subscriptions
