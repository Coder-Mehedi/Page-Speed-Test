import axios from 'axios';
import { isValidUrl } from './isValidUrl';
import { pageSpeedApiEndpointUrl } from './pageSpeedApiEndpointUrl';

export const getData = async (
  url: string,
  setDesktopData: any,
  setMobileData: any
) => {
  if (isValidUrl(url)) {
    try {
      const { data: resDeskData } = await axios.get(
        pageSpeedApiEndpointUrl(url, 'desktop')
      );
      setDesktopData((desktopData: any) => [...desktopData, resDeskData]);
      const { data: resMobData } = await axios.get(
        pageSpeedApiEndpointUrl(url, 'mobile')
      );
      setMobileData((mobileData: any) => [...mobileData, resMobData]);
    } catch (error) {
      console.log(error);
    }
  }
};
