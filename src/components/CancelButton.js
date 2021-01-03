import React from 'react'
import { 
    TouchableOpacity, 
    Text 
} from 'react-native'

export default CancelButton = ({resetAction,navigation}) => {
    return (
        <TouchableOpacity style={{ marginRight: 20 }}>
            <Text style={{ fontSize: 14, color: '#fff' }} onPress={() => navigation.dispatch(resetAction)}>Hủy</Text>
        </TouchableOpacity>
    )
}