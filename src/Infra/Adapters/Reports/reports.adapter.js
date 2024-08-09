import { utils, writeFileXLSX } from "xlsx";
import { ReportsService } from "../../Services/Reports/reports.service";

function formatReportArrayForExcelFile(columns, rows) {
  const formattedReport = rows.map((item) => {
    let json = {};
    item.forEach((element, index) => {
      json[columns[index]] = element;
    });
    return json;
  });
  console.log(formattedReport)
  return formattedReport;
}

export class ReportsAdapter {
  static async get() {
    const response = await ReportsService.get();
    return response;
  }

  static async getWithPagination(page, pageSize, filters) {
    const response = await ReportsService.getWithPagination(page, pageSize, filters);
    return response;
  }

  static async executeReport(page, pageSize, filters) {
    const response = await ReportsService.executeReport(page, pageSize, filters);
    return response;
  }
  static async getById(idReport) {
    const response = await ReportsService.getById(idReport);
    return response;
  }
  static async createOne(report) {
    const response = await ReportsService.createOne(report);
    return response;
  }
  static async editOneById(id, report) {
    const reportREQ = {
      name: report.name,
      observations: report.observations,
      query: report.query,
      filters: report.filters,
    };
    const response = await ReportsService.editById(id, reportREQ);
    return response;
  }
  static async deleteOneById(id) {
    const response = await ReportsService.deleteOneById(id);
    return response;
  }
  static async createExcel(filter) {
    const response = await this.executeReport(0,0, filter);
    const report = formatReportArrayForExcelFile(response.columns, response.rows);
    const ws = utils.json_to_sheet(report);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb,`report_${response.name}.xlsx`);
  }

  
}
