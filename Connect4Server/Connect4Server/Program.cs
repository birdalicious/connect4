using Connect4Server.Hubs;

namespace Connect4Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(o => o.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins(new string[] { "http://localhost:5173", "http://10.11.90.61:5173" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            }));


            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapHub<Connect4Hub>("/connect4");

            app.MapControllers();

            app.Run();
        }
    }
}