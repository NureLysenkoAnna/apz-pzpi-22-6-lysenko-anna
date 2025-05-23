﻿// <auto-generated />
using System;
using GasDec.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GasDec.Migrations
{
    [DbContext(typeof(GasLeakDbContext))]
    [Migration("20241221175932_AddSeverityLevelEnumToEvent")]
    partial class AddSeverityLevelEnumToEvent
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("GasDec.Models.Event", b =>
                {
                    b.Property<int>("event_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("event_id"));

                    b.Property<int>("data_id")
                        .HasColumnType("int");

                    b.Property<DateTime>("event_time")
                        .HasColumnType("datetime2");

                    b.Property<int>("severity")
                        .HasColumnType("int");

                    b.HasKey("event_id");

                    b.HasIndex("data_id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("GasDec.Models.Location", b =>
                {
                    b.Property<int>("location_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("location_id"));

                    b.Property<double?>("area")
                        .HasColumnType("float");

                    b.Property<int>("floor")
                        .HasColumnType("int");

                    b.Property<string>("location_type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("location_id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("GasDec.Models.Notification", b =>
                {
                    b.Property<int>("notification_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("notification_id"));

                    b.Property<int>("event_id")
                        .HasColumnType("int");

                    b.Property<DateTime>("formation_time")
                        .HasColumnType("datetime2");

                    b.Property<string>("message")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("notification_type")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<int>("user_id")
                        .HasColumnType("int");

                    b.HasKey("notification_id");

                    b.HasIndex("event_id");

                    b.HasIndex("user_id");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("GasDec.Models.Sensor", b =>
                {
                    b.Property<int>("sensor_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("sensor_id"));

                    b.Property<DateTime>("installation_date")
                        .HasColumnType("datetime2");

                    b.Property<int>("location_id")
                        .HasColumnType("int");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("sensor_id");

                    b.HasIndex("location_id");

                    b.ToTable("Sensors");
                });

            modelBuilder.Entity("GasDec.Models.SensorCheck", b =>
                {
                    b.Property<int>("check_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("check_id"));

                    b.Property<DateTime>("check_date")
                        .HasColumnType("datetime2");

                    b.Property<string>("result")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("sensor_id")
                        .HasColumnType("int");

                    b.HasKey("check_id");

                    b.HasIndex("sensor_id");

                    b.ToTable("SensorChecks");
                });

            modelBuilder.Entity("GasDec.Models.SensorData", b =>
                {
                    b.Property<int>("data_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("data_id"));

                    b.Property<double>("gas_level")
                        .HasColumnType("float");

                    b.Property<double>("pressure")
                        .HasColumnType("float");

                    b.Property<int>("sensor_id")
                        .HasColumnType("int");

                    b.Property<double>("temperature")
                        .HasColumnType("float");

                    b.Property<DateTime>("time_stamp")
                        .HasColumnType("datetime2");

                    b.HasKey("data_id");

                    b.HasIndex("sensor_id");

                    b.ToTable("SensorData");
                });

            modelBuilder.Entity("GasDec.Models.User", b =>
                {
                    b.Property<int>("user_id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("user_id"));

                    b.Property<string>("email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int?>("location_id")
                        .HasColumnType("int");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("phone_number")
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.Property<string>("role")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("user_name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("user_id");

                    b.HasIndex("location_id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("GasDec.Models.Event", b =>
                {
                    b.HasOne("GasDec.Models.SensorData", "SensorData")
                        .WithMany()
                        .HasForeignKey("data_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SensorData");
                });

            modelBuilder.Entity("GasDec.Models.Notification", b =>
                {
                    b.HasOne("GasDec.Models.Event", "Event")
                        .WithMany()
                        .HasForeignKey("event_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GasDec.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GasDec.Models.Sensor", b =>
                {
                    b.HasOne("GasDec.Models.Location", "Location")
                        .WithMany("Sensors")
                        .HasForeignKey("location_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");
                });

            modelBuilder.Entity("GasDec.Models.SensorCheck", b =>
                {
                    b.HasOne("GasDec.Models.Sensor", "Sensor")
                        .WithMany("SensorChecks")
                        .HasForeignKey("sensor_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sensor");
                });

            modelBuilder.Entity("GasDec.Models.SensorData", b =>
                {
                    b.HasOne("GasDec.Models.Sensor", "Sensor")
                        .WithMany("SensorData")
                        .HasForeignKey("sensor_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sensor");
                });

            modelBuilder.Entity("GasDec.Models.User", b =>
                {
                    b.HasOne("GasDec.Models.Location", "Location")
                        .WithMany("Users")
                        .HasForeignKey("location_id");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("GasDec.Models.Location", b =>
                {
                    b.Navigation("Sensors");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("GasDec.Models.Sensor", b =>
                {
                    b.Navigation("SensorChecks");

                    b.Navigation("SensorData");
                });
#pragma warning restore 612, 618
        }
    }
}
