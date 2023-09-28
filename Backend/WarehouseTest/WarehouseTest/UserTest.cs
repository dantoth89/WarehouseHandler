namespace UserTest
{
    [TestFixture]
    public class UserTest
    {
        private UserService _userService;
        private WarehouseContext _warehouseContext;

        [SetUp]
        public void Setup()
        {
            var optionsBuilder = new DbContextOptionsBuilder<WarehouseContext>();
            optionsBuilder.UseSqlServer(
                "Server=(localdb)\\mssqllocaldb;Trusted_Connection=True;Initial Catalog=WarehouseDb;");
            var dbContextOptions = optionsBuilder.Options;

            _warehouseContext = new WarehouseContext(dbContextOptions);

            _userService = new UserService(_warehouseContext);
        }

        
        [Test]
        public async Task TestNotNull()
        {
            Assert.NotNull(_warehouseContext);
        }


        [Test]
        public async Task AddUserTest()
        {
            var user = new User
            {
                Username = "John Doe",
                Password = "laterNeedToBeHashed",
                Role = Role.Worker
            };

            try
            {
                await _userService.AddUser(user);

                var addedUser = _warehouseContext.Users.FirstOrDefault(u => u.Username == user.Username);

                Assert.NotNull(addedUser);
                Assert.AreEqual(user.Username, addedUser.Username);
                Assert.AreEqual(user.Role, addedUser.Role);
            }
            finally
            {
                if (user != null)
                {
                    var userToDelete = _warehouseContext.Users.FirstOrDefault(u => u.Username == user.Username);
                    if (userToDelete != null)
                    {
                        _warehouseContext.Users.Remove(userToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task GetUserTest()
        {
            var user = new User
            {
                Username = "John Doe",
                Password = "laterNeedToBeHashed",
                Role = Role.Worker
            };

            try
            {
                await _userService.AddUser(user);

                var retrievedUser = _warehouseContext.Users.FirstOrDefault(u => u.Username == user.Username);
                var retrievedUserToChk = await _userService.GetUser(retrievedUser.Id);

                Assert.NotNull(retrievedUserToChk);
                Assert.AreEqual(user.Username, retrievedUserToChk.Username);
                Assert.AreEqual(user.Role, retrievedUserToChk.Role);
            }

            finally
            {
                if (user != null)
                {
                    var userToDelete = _warehouseContext.Users.FirstOrDefault(u => u.Username == user.Username);
                    if (userToDelete != null)
                    {
                        _warehouseContext.Users.Remove(userToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task UpdateUserTest()
        {
            var user = new User
            {
                Username = "John Doe",
                Password = "laterNeedToBeHashed",
                Role = Role.Worker
            };
            
            var userUpdate = new User
            {
                Username = "Jane Doe",
                Password = "laterRealyNeedToBeHashed",
                Role = Role.Customer
            };

            try
            {
                await _userService.AddUser(user);

                var retrievedUser = _warehouseContext.Users.FirstOrDefault(u => u.Username == user.Username);
                await _userService.UpdateUser(userUpdate, retrievedUser.Id);
                
                var retrievedUserToChk = await _userService.GetUser(retrievedUser.Id);

                Assert.NotNull(retrievedUserToChk);
                Assert.AreEqual(userUpdate.Username, retrievedUserToChk.Username);
                Assert.AreEqual(userUpdate.Role, retrievedUserToChk.Role);
            }

            finally
            {
                if (user != null)
                {
                    var userToDelete = _warehouseContext.Users.FirstOrDefault(u => u.Username == user.Username);
                    if (userToDelete != null)
                    {
                        _warehouseContext.Users.Remove(userToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }

        [Test]
        public async Task DeleteUserTest()
        {
            var user = new User
            {
                Username = "John Doe",
                Password = "laterNeedToBeHashed",
                Role = Role.Worker
            };

            try
            {
                await _userService.AddUser(user);

                var retrievedUser = _warehouseContext.Users.FirstOrDefault(u => u.Username == user.Username);
                var retrievedUserToChk = await _userService.GetUser(retrievedUser.Id);

                Assert.NotNull(retrievedUserToChk);
                Assert.AreEqual(user.Username, retrievedUserToChk.Username);
                Assert.AreEqual(user.Role, retrievedUserToChk.Role);

                await _userService.DeleteUser(retrievedUser.Id);
                
                var deletedUser = await _warehouseContext.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
                
                Assert.Null(deletedUser);
                
            }

            finally
            {
                if (user != null)
                {
                    var userToDelete = _warehouseContext.Users.FirstOrDefault(u => u.Username == user.Username);
                    if (userToDelete != null)
                    {
                        _warehouseContext.Users.Remove(userToDelete);
                        await _warehouseContext.SaveChangesAsync();
                    }
                }
            }
        }
    }
}