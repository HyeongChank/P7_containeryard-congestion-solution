package com.simul.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.simul.controller.SimulController;
import com.simul.domain.Simulator;
import com.simul.persistence.SimulRepository;

@Service
public class SimulService {
	
	@Autowired
	SimulRepository sr;
//	SimulController sc;
	
    public List<Simulator> readCsvFile() throws IOException {
		String filePath = "C:/git clone/P7_simulation/P7_Simulator/data/sorted_truck_simulation_results.csv"; // 실제 CSV 파일 경로로 수정
		//String filePath = "D:/김형찬/Congest_project/data/sorted_truck_simulation_results.csv"; // 실제 CSV 파일 경로로 수정
		List<Simulator> sm = new ArrayList<>();
        BufferedReader reader = null;
        boolean isFirstLine = true;
        try {
        	
            reader = new BufferedReader(new FileReader(ResourceUtils.getFile(filePath)));
            String line;
            while ((line = reader.readLine()) != null) {
            	if(isFirstLine) {
            		isFirstLine = false;
            		continue;
            	}
            	
                String[] fields = line.split(","); // CSV 파일의 필드 구분자에 맞게 수정
            	String number_before=  fields[0];
            	Long number = Long.parseLong(number_before);
            	String code =fields[1];
            	String entryTime_before = fields[2];
            	int entryTime = Integer.parseInt(entryTime_before)*1000;
            	String out_time_before = fields[9];
            	int out_time = Integer.parseInt(out_time_before)*1000;
                
                String unload_count_before = fields[12];
                int unload_count = Integer.parseInt(unload_count_before);
                String load_count_before = fields[13];
                int load_count = Integer.parseInt(load_count_before);
                String yard_truck_count_before = fields[18];
                int yard_truck_count = Integer.parseInt(yard_truck_count_before);  
                String unload_block = fields[14];
                String load_block = fields[15];
                String entry_count_before = fields[16];
                int entry_count = Integer.parseInt(entry_count_before);
                String exit_count_before = fields[17];
                int exit_count = Integer.parseInt(exit_count_before);
                String spot_wait_time_before = fields[18];
                int spot_wait_time = Integer.parseInt(spot_wait_time_before);
                String unload_progress_truck_count_before = fields[19];
                int unload_progress_truck_count = Integer.parseInt(unload_progress_truck_count_before);
                String load_progress_truck_count_before = fields[20];
                int load_progress_truck_count = Integer.parseInt(load_progress_truck_count_before);
                
                
                String start_unload_work_before = fields[4];
                int start_unload_work = Integer.parseInt(start_unload_work_before) *1000;
                String arrive_unload_spot_before = fields[3];
                int arrive_unload_spot = Integer.parseInt(arrive_unload_spot_before)*1000;
                
                
                String start_load_work_before = fields[7];
                int start_load_work = Integer.parseInt(start_load_work_before)*1000;
                String arrive_load_spot_before = fields[6];
                int arrive_load_spot = Integer.parseInt(arrive_load_spot_before)*1000;
                
            	
            	boolean visible = true;
            	String complete_unload_work_before = fields[5];
            	int complete_unload_work = Integer.parseInt(complete_unload_work_before)*1000;
            	String complete_load_work_before = fields[8];
            	int complete_load_work = Integer.parseInt(complete_load_work_before)*1000;
            	
            	String work_time_before = fields[10];
            	int work_time = Integer.parseInt(work_time_before)*1000;
            	String op = fields[11];
            	
            	int unload_wait_time = start_unload_work - arrive_unload_spot;
            	int load_wait_time = start_load_work - arrive_load_spot;

            	int entry_to_unload = arrive_unload_spot - entryTime;
        		int entry_to_load = arrive_load_spot - entryTime;
            	int arrive_to_complete_unload = complete_unload_work - arrive_unload_spot;
            	int arrive_to_complete_load = complete_load_work - arrive_load_spot;
            	int complete_to_exit_unload = out_time - complete_unload_work;
            	int complete_to_exit_load = out_time - complete_load_work;
     	        int unload_to_load = arrive_load_spot - complete_unload_work;
            	
            	
            	    
            	    
            	Simulator smr = new Simulator(number, code, entryTime, arrive_unload_spot, start_unload_work,
            			complete_unload_work, arrive_load_spot, start_load_work, complete_load_work, out_time,
            			work_time, op, unload_count, load_count, unload_block, load_block,
            			entry_count, exit_count, spot_wait_time, yard_truck_count, unload_progress_truck_count,
            			load_progress_truck_count, visible);
            	sm.add(smr);
            	
            }
            System.out.println("success");
        } finally {
            if (reader != null) {
                reader.close();
            }
        }
         return sm;
    }

	public ResponseEntity<String> insertSimul(ResponseEntity<String> response) {
		System.out.println("service");
		List<Simulator> smlist = new ArrayList<>();
//		for(Simulator sm : response) {
//			smlist.add(sm);
//		}
//		System.out.println(response);
		return response;
	}

}
