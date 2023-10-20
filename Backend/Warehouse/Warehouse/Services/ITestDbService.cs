namespace Warehouse.Services;

public interface ITestDbService
{
    Task CreateTestData();

    Task CleanDB();
}