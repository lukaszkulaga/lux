CREATE TABLE [dbo].[zgloszenia](
    [IdZgloszenia] [int] IDENTITY(1,1) NOT NULL,
    [IdKlienta] [int] NULL,
    [IdAdres] [int] NULL,
    [DataDodania] [datetime2](7) NULL,
    [PlanowanaRealizacjaOd] [nvarchar](255) NULL,
    [PlanowanaRealizacjaDo] [nvarchar](255) NULL,
    [GodzinaOd] [nvarchar](255) NULL,
    [GodzinaDo] [nvarchar](255) NULL,
    [DokladnaLokalizacja] [nvarchar](255) NULL,
    [Opis] [nvarchar](255) NULL,
    [Kategoria] [int] NULL,
    [Priorytet] [int] NULL,
    [Status] [int] NULL,
    [DataModyfikacji] [datetime2](7) NULL,
    [User] [nvarchar](255) NULL
    PRIMARY KEY CLUSTERED
(
[IdZgloszenia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO