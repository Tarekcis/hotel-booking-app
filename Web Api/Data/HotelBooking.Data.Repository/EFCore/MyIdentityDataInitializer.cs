﻿using HotelBooking.Domain;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.Data.Repository.EFCore
{
    public class MyIdentityDataInitializer
    {
        public static void SeedData(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }
        public static void SeedUsers(UserManager<IdentityUser> userManager)
        {
            if (userManager.FindByEmailAsync("superadmin@gmail.com").Result == null)
            {
                var user = new IdentityUser
                {
                    UserName = "superadmin@gmail.com",
                    Email = "superadmin@gmail.com",
                    EmailConfirmed = true
                };

                var result = userManager.CreateAsync(user, "Test@123").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Administrator").Wait();
                }
            }
        }
        public static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("Member").Result)
            {
                var role = new IdentityRole
                {
                    Name = "Member",
                    NormalizedName = "MEMBER"
                };
                roleManager.CreateAsync(role);
            }

            if (!roleManager.RoleExistsAsync("Administrator").Result)
            {
                var role = new IdentityRole
                {
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR"
                };
                roleManager.CreateAsync(role);
            }
        }
    }
}
