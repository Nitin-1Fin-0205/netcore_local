import { BadRequestException, Injectable } from '@nestjs/common';
import { AddActivity } from './dto/addActivity.dto';
import { HttpService } from '@nestjs/axios';
import { application } from 'express';

@Injectable()
export class ActivityService {
  constructor(private readonly httpService: HttpService) {}
  async netcoreActivity(dataObj) {
    //TODO: Insert values of Required in .env files
    //NetCore_Push_Notification_Auth
    //netCore_activity_api
    const headers = {
      Authorization: `Bearer ${process.env.NetCore_Push_Notification_Auth}`,
      'Content-Type': 'application/json',
    };

    let endpoint = process.env.netCore_activity_api;

    try {
      //TODO: check for Response First
      const response = await this.httpService.axiosRef.post(endpoint, dataObj, {
        headers,
      });

      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      throw new BadRequestException('Unable To Add Activity');
    }
  }
  async addActivity(addActivityDto: AddActivity[]) {
    let dataObj = addActivityDto.map((item) => {
      return {
        asset_id: item.asset_id,
        activity_name: item.activity_name,
        timestamp: item.timestamp.toString()
          ? item.timestamp.toString()
          : new Date(),
        identity: item.identity,
        activity_source: 'app',
        activity_params: {
          customer_user_id: item.activity_params?.customer_user_id || null,
          name: item.activity_params?.name || null,
          mobile_number: item.activity_params?.mobile_number || null,
          assigned_to: item.activity_params?.assigned_to || null,
          date: item.activity_params?.date || null,
          time: item.activity_params?.time || null,
          meeting_link: item.activity_params?.meeting_link || null,
        },
      };
    });

    //TODO: Find API Response Data Of this API
    const data = await this.netcoreActivity(dataObj);

    //TODO:check fo data that needs to be inserted in application Log
    let applicationLogPayload = dataObj.map((x) => {
      return {
        created_date: new Date().toISOString(),
        request: JSON.stringify(data), //chek this Data
        log: x.activity_name,
        token: JSON.stringify(data.Result), // check this Data
        user_code: x.identity,
      };
    });

    // TODO: Insert Query to insert Data in application Log Table

    // TODO: make new Response class and pass *data.Result* & return this

    return; //data.Result
  }
}
