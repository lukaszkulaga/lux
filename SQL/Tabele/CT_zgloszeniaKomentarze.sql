CREATE TABLE [dbo].[zgloszeniaKomentarze](
    [IdZgloszeniaKomentarze] [int] IDENTITY(1,1) NOT NULL,
    [IdZgloszenia] [int] NOT NULL,
    [Komentarz] [nvarchar](255) NULL,
    [DataDodania] [datetime2](7) NULL,
    [User] [nvarchar](255) NULL
    PRIMARY KEY CLUSTERED
(
[IdZgloszeniaKomentarze] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO