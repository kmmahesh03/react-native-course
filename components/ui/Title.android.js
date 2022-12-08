import {Text,StyleSheet,Platform} from 'react-native';
import Colors from '../../constants/colors';
function Title({children})
{
    return <Text style={styles.title}>{children}</Text>
}
export default Title;


const styles=StyleSheet.create({
    title:
    {
        fontSize:18,
        fontFamily:'open-sans-bold',
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
        //borderWidth:Platform.OS==='android' ? 2:0,
        //borderWidth:Platform.select({ios:0,android:2}),
        borderWidth:2,
        padding:12,
        borderColor:'white',
        maxWidth:'80%',
        width:300,
 
    },

})