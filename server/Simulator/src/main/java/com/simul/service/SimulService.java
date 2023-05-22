package com.simul.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.simul.controller.SimulController;
import com.simul.domain.Simulator;

@Service
public class SimulService {
	
//	@Autowired
//	SimulController sc;
	
	private List<Simulator> sm = new ArrayList<>();
	
    public List<Simulator> readCsvFile() throws IOException {
//		String filePath = "C:/git clone/P7_simulation/P7_Simulator/sorted_truck_simulation_results.csv"; // 실제 CSV 파일 경로로 수정
		String filePath = "D:/김형찬/Congest_project/sorted_truck_simulation_results.csv"; // 실제 CSV 파일 경로로 수정

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
                String block = fields[11];
                String unload_count_before = fields[12];
                int unload_count = Integer.parseInt(unload_count_before);
                String load_count_before = fields[13];
                int load_count = Integer.parseInt(load_count_before);
                String yard_truck_count_before = fields[14];
                int yard_truck_count = Integer.parseInt(yard_truck_count_before);  
                String start_unload_work_before = fields[4];
                int start_unload_work = Integer.parseInt(start_unload_work_before);
                String arrive_unload_spot_before = fields[3];
                int arrive_unload_spot = Integer.parseInt(arrive_unload_spot_before);
                int unload_wait_time = start_unload_work - arrive_unload_spot;
                
                String start_load_work_before = fields[7];
                int start_load_work = Integer.parseInt(start_load_work_before);
                String arrive_load_spot_before = fields[6];
                int arrive_load_spot = Integer.parseInt(arrive_load_spot_before);
                int load_wait_time = start_load_work - arrive_load_spot;
            	int total_wait_time = unload_wait_time + load_wait_time;
            	boolean visible = true;
            	String complete_unload_work_before = fields[5];
            	int complete_unload_work = Integer.parseInt(complete_unload_work_before);
            	String complete_load_work_before = fields[8];
            	int complete_load_work = Integer.parseInt(complete_load_work_before);
            	Simulator smr = new Simulator(number, code, entryTime, arrive_unload_spot, start_unload_work, 
            			complete_unload_work, arrive_load_spot, start_load_work, complete_load_work, out_time,
            			block, unload_count, load_count, yard_truck_count,unload_wait_time, load_wait_time,
            			total_wait_time, visible);
            	sm.add(smr);
            	System.out.println(smr.toString());
            }
        } finally {
            if (reader != null) {
                reader.close();
            }
        }
         return sm;
    }

}
