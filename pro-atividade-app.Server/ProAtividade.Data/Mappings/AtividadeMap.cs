using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using pro_atividade_app.Server.ProAtividade.Domain.Entities;

namespace pro_atividade_app.Server.ProAtividade.Data.Mappings;

public class AtividadeMap : IEntityTypeConfiguration<Atividade>
{
    public void Configure(EntityTypeBuilder<Atividade> builder)
    {   
        builder.ToTable("Atividades");

        builder.Property(t => t.Titulo)
            .HasColumnType("varchar(100)");
        builder.Property(d => d.Descricao)
            .HasColumnType("varchar(225)");
    }
}
