using Microsoft.EntityFrameworkCore;
using pro_atividade_app.Server.ProAtividade.Domain.Entities;

namespace pro_atividade_app.Server.ProAtividade.Data.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Atividade> Atividades { get; set; }
    }
}