import {View,StyleSheet,Alert,Text,FlatList,useWindowDimensions} from'react-native';
import Title from '../components/ui/Title';
import {useState,useEffect} from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import {Ionicons} from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

let minBoundary=1;
let maxBoundary=100;
function GameScreen({userNumber,onGameOver})
{
    const initialGuess=generateRandomBetween(1,100,userNumber);
    const [currentGuess,setCurrentGuess]=useState(initialGuess);
    const [guessRounds,setGuessRounds]=useState([initialGuess]);
    const {width,height}=useWindowDimensions();
    
    useEffect(()=>{
        if(currentGuess===userNumber)
        {
            onGameOver(guessRounds.length);
        }
    },[currentGuess,userNumber,onGameOver]);

    useEffect(()=>{
        minBoundary=1,
        maxBoundary=100
    },[]);

    function nextGuessHandler(direction)
    {
        if((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber))
        {
            Alert.alert("Don't Lie",'You know that is wrong...',[{text:'Sorry!',style:'cancel'}]);
            return ;
        }
        //lower or greater use direction
        if(direction==='lower')
        {
            maxBoundary=currentGuess;
        }
        else
        {
            minBoundary=currentGuess+1;
        }
        console.log(minBoundary,maxBoundary);
        const newRndNumber = generateRandomBetween(minBoundary,maxBoundary,currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds=>[newRndNumber,...prevGuessRounds]);
        
    }

    const guessRoundListLength=guessRounds.length;
    let content=(
    <>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
        <InstructionText style={styles.instrutionText}>Higher or Lower?</InstructionText>
        <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
                <PrimaryButton  onPress={nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name="md-remove-circle" size={24} color="white"/>
                </PrimaryButton>
                </View>
        <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
            <Ionicons name="md-add-circle" size={24} color="white"/>
                </PrimaryButton>
                </View>
        </View>
        </Card>
    </>);

    if(width>500)
    {
        content=(
        <>
    
        <View style={styles.buttonContainerWide}>
        <View style={styles.buttonContainer}>
                <PrimaryButton  onPress={nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name="md-remove-circle" size={24} color="white"/>
                </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
            <Ionicons name="md-add-circle" size={24} color="white"/>
                </PrimaryButton>
            </View>
        </View>
        
        </>);
    }

    return (
        <View style={styles.screen}>
    <Title>Opponent's Guess</Title>
        {content}
        <View style={styles.listContainer}>
            {/* {guessRounds.map(guessRound=><Text key={guessRound}>{guessRound}</Text>)} */}
            <FlatList 
            data={guessRounds} 
            renderItem={(itemData)=> 
            <GuessLogItem roundNumber={guessRoundListLength-itemData.index} guess={itemData.item} />}
            keyExtractor={(item)=>item}
            />
        </View>
    </View>
    
    );
}
export default GameScreen;

const styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:24,
        alignItems:'center',
    },
    buttonsContainer:
    {
        flexDirection:'row',
    },
    buttonContainer:{
        flex:1,
    },
    instrutionText:{
        marginBottom:12,

    },
    listContainer:
    {
        flex:1,
        padding:16,

    },
    buttonContainerWide:
    {
        flexDirection:'row',
        alignItems:'center'
    }
    
    

})