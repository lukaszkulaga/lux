

CREATE TABLE [dbo].[klienciKontakt](
    [IdKontakt] [int] IDENTITY(1,1) NOT NULL,
    [IdKlienta] [int] NOT NULL,
    [Telefon] [nvarchar](255) NULL,
    [Email] [nvarchar](255) NULL,
    [DataModyfikacji] [datetime2](7) NULL,
    [User] [nvarchar](255) NULL
    PRIMARY KEY CLUSTERED
(
[IdKontakt] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO

ALTER TABLE [dbo].[klienciKontakt]  WITH CHECK ADD FOREIGN KEY([IdKlienta])
    REFERENCES [dbo].[klienci] ([IdKlienta])
    GO

