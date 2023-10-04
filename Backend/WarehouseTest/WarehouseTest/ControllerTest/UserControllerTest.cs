using System;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using Warehouse.Controllers;
using Warehouse.Models.DTO;
using Warehouse.Services;

namespace YourProject.Tests
{
    [TestFixture]
    public class UserControllerTests
    {
        private UserController _controller;
        private IUserService _userService;

        [SetUp]
        public void Setup()
        {
            // In an actual application, you might set up a test database or use an in-memory database.
            // For simplicity, you can create a UserService with a mock repository in memory for testing.

            _userService = new UserServiceMock();
            _controller = new UserController(_userService);
        }

        [Test]
        public void Register_WithValidData_ReturnsOk()
        {
            // Arrange
            var user = new UserDto
            {
                Username = "testuser",
                Password = "password123"
                // Other properties if needed
            };

            // Act
            var result = _controller.Register(user) as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
            Assert.AreEqual("Registration successful!", result.Value);
        }

        [Test]
        public void Register_WithExistingUsername_ReturnsBadRequest()
        {
            // Arrange
            var existingUser = new UserDto
            {
                Username = "existinguser",
                Password = "password123"
                // Other properties if needed
            };
            _userService.AddUser(existingUser); // Add the existing user to your mock repository

            var user = new UserDto
            {
                Username = "existinguser", // Same username as existingUser
                Password = "newpassword123"
                // Other properties if needed
            };

            // Act
            var result = _controller.Register(user) as BadRequestObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual("Username is already in use. Please choose another.", result.Value);
        }
    }
}