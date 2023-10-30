﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231030092208_IsRequest")]
    partial class IsRequest
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.12");

            modelBuilder.Entity("Model.Chore", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Energy")
                        .HasColumnType("INTEGER");

                    b.Property<int>("HouseholdId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("RepeatInterval")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Chores");
                });

            modelBuilder.Entity("Model.Household", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Code")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Households");
                });

            modelBuilder.Entity("Model.Profile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Avatar")
                        .HasColumnType("INTEGER");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("HouseholdId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("isActive")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("isAdmin")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("isDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("isRequest")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("HouseholdId");

                    b.HasIndex("UserId");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("Model.ProfileChore", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ChoreId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("DateCompleted")
                        .HasColumnType("TEXT");

                    b.Property<int>("ProfileId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("ProfileChores");
                });

            modelBuilder.Entity("Model.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Model.Household", b =>
                {
                    b.HasOne("Model.User", null)
                        .WithMany("Households")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Model.Profile", b =>
                {
                    b.HasOne("Model.Household", "Household")
                        .WithMany("Profiles")
                        .HasForeignKey("HouseholdId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Model.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Household");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Model.Household", b =>
                {
                    b.Navigation("Profiles");
                });

            modelBuilder.Entity("Model.User", b =>
                {
                    b.Navigation("Households");
                });
#pragma warning restore 612, 618
        }
    }
}
