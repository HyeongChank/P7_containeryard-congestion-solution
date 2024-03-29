from DA.myp import simulator_optimize
from DA.myp import simulator_sort2
from DA.myp import simulator_predict
import csv
import time

def operate():
    # simulator_optimize.make_simul_operate()
    # print("optimize complete")
    # time.sleep(3)
    
    simulator_sort2.operate()
    print("sort complete")
    time.sleep(3)
    simulator_predict.operate()
    print("predict complete")
    time.sleep(3)
    
    file_path = 'data/predict_truck_simulation_results.csv'
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
   
    headers = data[0]
    rows = data[1:]
    json_data = [dict(zip(headers, row)) for row in rows]
    return json_data

if __name__=='__main__':
    operate()