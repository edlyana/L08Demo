import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({

	textStyle: {
    	fontSize: 15,
    	margin: 10,
   		textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        fontWeight:'bold',
        fontFamily:'impact'
    },
});

const Home = ({navigation}) => {

    // 'mydata' contains the final data to be loaded on users' screen
    const [mydata, setMyData] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem('alphadata');  // To retrive item names 'alphadata' in phone memory
        // if 'alphadata' is available then open that new data
        if(datastr != null){
            jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        }
        // 'alphadata' is not available then use default data from datasource
        else{
            setMyData(datasource);
        }
    };

    getData();

  const renderItem = ({item, index, section}) => {
    return (
    <TouchableOpacity style={styles.opacityStyle}
    onPress={()=>
      {
          let datastr = JSON.stringify(mydata)
          navigation.navigate("Edit",{index:index, type:section.title, key:item.key, datastring:datastr})
      }
    }
    >
    <Text style={styles.textStyle}>{item.key}</Text>
    </TouchableOpacity>
    );
  };

   return (
    <View>
      <StatusBar/>
	  <Button title='Add Letter' onPress={()=>{     // Make data
          let datastr = JSON.stringify(mydata);
          navigation.navigate("Add", {datastring:datastr});     // used as route for Add.js
      }}
      />
      <SectionList sections={mydata} renderItem={renderItem}
      renderSectionHeader={({section:{title,bgcolor}})=>(
      <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
        {title}
      </Text>
      )}/>
    </View>
  );
};

export default Home;
