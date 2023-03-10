import { useState } from 'react'
import LastVerifiedStats from '../LastVerifiedStats'
import VerifyActions from '../VerifyActions'
import VerifyForm from '../VerifyForm'
import './styles.css'

const VerifySection = () => {
    const [formVisible, setFormVisible] = useState(false)
    const [actionSelected, setActionSelected] = useState('')

    const className = 'VerifySection'
    return (
        <div className={className}>            
            <LastVerifiedStats/>
            {formVisible ?
                <VerifyForm setFormVisible={setFormVisible} actionSelected={actionSelected} />
            :
                <VerifyActions setFormVisible={setFormVisible} setActionSelected={setActionSelected} />
            }         
        </div>
    )
}

export default VerifySection