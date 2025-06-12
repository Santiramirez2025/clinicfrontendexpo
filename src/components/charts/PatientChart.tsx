import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface PatientChartProps {
  data?: Array<{
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
  }>;
  title?: string;
}

const PatientChart: React.FC<PatientChartProps> = ({ 
  data,
  title = 'Distribución de Pacientes' 
}) => {
  const screenWidth = Dimensions.get('window').width;

  const defaultData = [
    {
      name: 'Nuevos',
      population: 35,
      color: '#007AFF',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Regulares',
      population: 45,
      color: '#28A745',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Inactivos',
      population: 20,
      color: '#FFC107',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={data || defaultData}
          width={screenWidth - 80}
          height={200}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          hasLegend={true}
          center={[10, 0]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
  },
});

export default PatientChart;
